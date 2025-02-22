import  "@mui/material"
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChannelPhoto from "../img/channel photo.png"
import Comments from "../Components/Comments";
import Card from "../Components/Card";
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess } from "../redux/videoSlice";
import { format } from "timeago.js"; 
import { like, dislike } from "../redux/videoSlice"; 
import { subscription } from "../redux/userSlice";
import Recommendation from "../Components/Recommendation";

const Container = styled.div`
display: flex;
gap: 24px;
`;

const Content = styled.div`
flex: 3.5;
`;

const VideoWrapper = styled.div`
`;

const Title = styled.h1`
font-style: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({theme})=>theme.text};
`;


const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const Info = styled.span`
color: ${({theme})=>theme.textSoft};
`;
const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({theme})=>theme.text};
gap: 15px;
`;

const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({theme})=>theme.text};
`;

const Button = styled.div`
`;

const Channel = styled.div`
display: flex;
justify-content: space-between;
`;

const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`;

const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;

const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color : ${({theme})=>theme.text};
`;

const ChannelName = styled.span`
font-weight: 500;
`;

const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({theme})=>theme.textSoft};
font-size: 12px;
`;

const Discription = styled.p`
font-size: 14px;
`;

const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`;

const VideoFrame = styled.video`
max-height: 720px;
width: 100%;
object-fit: cover;
`


const Video = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  console.log("Redux Current Video:", currentVideo); // Debugging
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`)
        console.log("=====>>Video Response: ", videoRes.data); // Debugging
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        
        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))

      } catch (err) {}
    }
    fetchData();
  },[path, dispatch]);

  if (!currentVideo) {
    return <div>Loading...</div>; // Show a loading indicator until currentVideo is available
  }

  const handleLike = async ()=>{
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async ()=>{
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async ()=>{
    currentUser.subscribedUsers.includes(channel._id)
    ? await axios.put(`/users/unsub/${channel._id}`)
    : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  }
  

  return <Container>
    <Content>
    <VideoWrapper>
      <VideoFrame src={currentVideo.videoUrl} controls/>
    </VideoWrapper>

    <Title>{currentVideo.title}</Title>
    <Details>
      <Info>
        {currentVideo.views} views . {format(currentVideo.createdAt)}
        </Info>
      <Buttons>
        <Button onClick={handleLike}>
         {currentVideo.likes?.includes(currentUser._id) ? (
         <ThumbUpIcon/>
         ) : (
           <ThumbUpOutlinedIcon/>
         )} {" "}
          {currentVideo.likes?.length}
        </Button>
        <Button onClick={handleDislike}>
          {currentVideo.dislikes?.includes(currentUser._id) ?(
          <ThumbDownIcon/>
          ) : (
          <ThumbDownOutlinedIcon/>
          )}{" "}
           Dislike
        </Button>
        <Button>
          <ReplyIcon/> Share
        </Button>
        <Button>
          <AddTaskIcon/> Save
        </Button>
      </Buttons>
    </Details>
   <Hr/>
   <Channel>
   <ChannelInfo>
    <Image src={channel.img} />
    <ChannelDetail>
      <ChannelName>{channel.name}</ChannelName>
      <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
      <Discription>
       {currentVideo.desc}
      </Discription>
    </ChannelDetail>

   </ChannelInfo>
    <Subscribe onClick={handleSub}>
      {currentUser.subscribedUsers?.includes(channel._id)
      ? "SUBSCRIBED"
      : "SUBSCRIBE"}
    </Subscribe>
   </Channel>
   <Hr/>
   <Comments videoId={currentVideo._id}/>
    </Content>
    <Recommendation tags={currentVideo.tags}/>

  </Container>
         
  
}

export default Video