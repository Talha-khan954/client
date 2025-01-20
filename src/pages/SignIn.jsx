import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice.js';
import { useDispatch } from 'react-redux';
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
/* height: 100vh; */
height: calc(100vh - 70px);
color: ${({theme})=>theme.text};
padding: 15vh;

@media (max-width: 768px) {
  padding: 5px;
}
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
/* height: calc(100vh - 70px); */
height: auto;
background-color: ${({theme})=>theme.bgLighter};
border: 1px solid ${({theme})=>theme.soft};
padding: 20px 50px;
gap: 8px;
width: auto;
  max-width: 400px;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 300px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    max-width: 90%;
  }
`;

const Title = styled.h1`
font-size: 24px;
`;

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;

`;

const Input = styled.input`
border: 1px solid ${({theme})=>theme.soft};
color: ${({theme})=>theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: auto;
font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
`;

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 15px;
font-weight: 500;
cursor: pointer;
background-color: ${({theme})=>theme.soft};
color: ${({theme})=>theme.textsoft};
font-size: 14px;

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 10px;
  }
`;

const More = styled.div`
display: flex;
margin-top: 10px;
font-size: 12px;
color: ${({theme})=>theme.textsoft};

@media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

const Links = styled.div`
margin-left: 45px;

@media (max-width: 768px) {
    margin-left: 20px;
  }

  @media (max-width: 480px) {
    margin-left: 10px;
  }
`;

const Link = styled.span`
margin-left: 30px;

@media (max-width: 768px) {
    margin-left: 15px;
  }

  @media (max-width: 480px) {
    margin-left: 8px;
  }
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signIn", {name, password});
      dispatch(loginSuccess(res.data));
    } catch (error) {
      console.error("Login failed:", error.response.data || error.message);
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
    .then((result) => {
      axios.post("/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
      }).then((res)=>{
        dispatch(loginSuccess(res.data))
      })
    })
    .catch((error) => {
      dispatch(loginFailure());
    });
  };

  return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>to continue to YouTube</SubTitle>
            <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
            <Input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin}>Sign in</Button>
            <Title>or</Title>
            <Button onClick={signInWithGoogle}>Signin with Google</Button>
            <Title>or</Title>
            <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
            <Input placeholder='email' onChange={e=>setEmail(e.target.value)}/>
            <Input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)}/>
            <Button>Sign up</Button>
        </Wrapper>
        <More>
            Einglish(USA)
            <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  )
}

export default SignIn