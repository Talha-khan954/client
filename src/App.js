import styled from "styled-components";
import Menu from "./Components/Menu";
import Navbar from "./Components/Navbar";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Utils/Theme";
import { useState } from "react";
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
// import { Home } from "@mui/icons-material";
import Video from "./pages/Video";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn.jsx";
import Search from "./pages/Search.jsx";

const Container = styled.div`
display: flex;
`

const Main = styled.div`
flex: 7;
background-color: ${({theme})=>theme.bg};
`;
const Wrapper = styled.div`
padding: 22px 20px;
`;


function App() {
const [darkMode, setDarkMode] = useState(true)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
  <Container>
    <Router>
       <Menu darkMode ={darkMode} setDarkMode={setDarkMode}/>
       <Main>
         <Navbar />
         <Wrapper>
          <Routes>
            <Route path="/">
              <Route index element={<Home type="random" />}/>
              <Route path="trends" element={<Home type="trend" />}/>
              <Route path="subscriptions" element={<Home type="sub" />}/>
              <Route path="search" element={<Search/>}/>
              <Route path="signin" element={<SignIn/>}/>
              <Route path="/Video">
              <Route path=":id" element={<Video/>}/>
            </Route>
            </Route>
          </Routes>
         </Wrapper>
       </Main>
    </Router>
  </Container>
  </ThemeProvider>
  )
}

export default App;
