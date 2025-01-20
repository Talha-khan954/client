import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from "../Components/Card";

const Container = styled.div`
flex: 2;
`;

const Recommendation = ({tags}) => {

    const [videos, setVideos] = useState([]);

    useEffect( () => {
        const fatchVideos = async () => {
            const res = await axios.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fatchVideos();
    }, [tags]);

  return (
    <Container>
        {videos.map(video=>(
            <Card type="sm" key={video._id} video={video} />
        ))}
    </Container>
  )
}

export default Recommendation