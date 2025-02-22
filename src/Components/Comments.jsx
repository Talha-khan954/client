import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AvtarPhoto from "../img/channel photo.png"
import Comment from "../Components/Comment.jsx"
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`

`;

const NewComment = styled.div`
display: flex;
align-items: center;
gap: 10px;
`;

const Avtar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;

const Input = styled.input`
border: none;
border-bottom: 1px solid ${({theme})=>theme.textSoft};
color: ${({theme})=>theme.text};
background-color: transparent;
outline: none;
padding: 5px;
width: 100%;
`;

const Comments = (videoId) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(()=>{
    const fetchComments = async ()=>{
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  },[videoId]);

  return (
    <Container >
        <NewComment>
           <Avtar src={currentUser.img}/> 
           <Input placeholder='Add a comment...' />
        </NewComment>
        {comments.map(comment=>(
            <Comment key={comment._id} comment={comment}/>
        ))}
    </Container>
  )
}

export default Comments