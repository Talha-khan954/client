import React from 'react'
import styled from 'styled-components'
import videoImg from "../img/Video-img.jpg"
// import theme from "../Utils/Theme"
import channelPhoto from "../img/channel photo.png"
import { Link } from "react-router-dom";
import Video from '../pages/Video';
import { format } from "timeago.js"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled.div`
width: ${(props)=>props.type !=="sm" && "360px"};
margin-bottom: ${(props)=>props.type ==="sm" ? "10px" : "45px"};
cursor: pointer;
display: ${(props)=>props.type ==="sm" && "flex"};
gap: 10px;
`;

const Image = styled.img`
width: ${(props)=>props.type ==="sm" ? "202px" : "360px"};
height: ${(props)=>props.type ==="sm" ? "150px" : "202px"};
background-color: #999;
flex: 2;
`;

const Details = styled.div`
display: flex;
margin-top: ${(props)=>props.type !=="sm" && "16px"};
gap: 12px;
flex: 1;
`;

const ChannelImage = styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
background-color: #999;
display: ${(props)=>props.type ==="sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
margin:0px 0px;
font-size: 16px;
font-weight: 500;
color: ${({theme})=>theme.text};
`;
const ChannelName = styled.h2`
font-size: 14px;
color: ${({theme})=>theme.textSoft};
margin: 7px 0px;
`;
const Info = styled.div`
font-size: 14px;
color: ${({theme})=>theme.textSoft};
`;

const Card = ({type, video}) =>{
  const [channel, setChannel] = useState({});
  useEffect(()=>{
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`)
      setChannel(res.data)
    }
    fetchChannel()
  },[video.userId])
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <Container type ={type}>
      <Image type ={type} src={video.imgUrl} />
      <Details type ={type}>
        <ChannelImage type ={type} src={channel.img}/>
        <Texts >
          <Title>{video.title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <Info>{video.views} views . {format(video.createdAt)} </Info>
          
        </Texts>
      </Details>
    </Container>
    </Link>
  )
}

export default Card