import { Card } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search

    useEffect(()=>{
        console.log(query,"query"); // Log query to verify the search parameter
        const fatchVideo = async () =>{
            const res = await axios.get(`/videos/search${query}`)
            console.log(res.data,"res.data"); // Log API response
            setVideos(res.data)
        }
        fatchVideo();
    },[query]);

  return (
    <Container>
        {videos.map(video=>(
            <Card key={video._id} video={video}/>
        ))}
    </Container>
  )
}

export default Search