import React,{useState} from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { Avatar } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Upload from "./Upload"


const Container = styled.div`
position: sticky;
top: 0;
background-color: ${({theme})=>theme.bgLighter};
color: ${({theme})=>theme.text};
height: 56px;
`;
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
position: relative;
`;
const Search = styled.div`
width: 40%;
position: absolute;
left: 0;
right: 0;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 5px;
`;
const Input = styled.input`
border: none;
outline: none;
width: 400px;
background-color: transparent;
color: ${({theme})=>theme.text};
`;
const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
gap: 5;
`;

  const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({theme})=>theme.text};
  `;

  const StyledAvatar = styled.div`
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #999;
`

const Navbar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const {currentUser} = useSelector(state=>state.user);
  return (
    <>
    <Container>
        <Wrapper>
          <Search>
            <Input
             placeholder='search'
             onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallIcon onClick={() => setOpen(true)}/>
              <Avatar src={currentUser.img}/>
              {currentUser.name}
            </User>
          ) : (<Link to="signin" style={{textDecoration:"none"}}>
          <Button>
           <AccountCircleIcon/>
            SIGN IN
          </Button>
          </Link>)}
        </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen}/>}
    </>
  )
}

export default Navbar