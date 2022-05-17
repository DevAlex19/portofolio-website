import React,{useState} from 'react';
import Todo from './Todo';
import styled,{createGlobalStyle} from 'styled-components';
import './styles/styles.css';
import { VERY_DARK_BLUE,VERY_LIGHT_GRAY,BG_MOBILE_DARK,BG_MOBILE_LIGHT,BG_DESKTOP_DARK,BG_DESKTOP_LIGHT } from './Resources';


const GlobalStyle = createGlobalStyle`
  body{
    background:${({theme})=> theme === 'dark' ? VERY_DARK_BLUE : VERY_LIGHT_GRAY};
    background-repeat:no-repeat;
    background-size:100%;
    display:flex;
    justify-content:center;
    min-height:100vh;
  }
`;

const BackgroundImage = styled.div`
  width:100%;
  height:300px;
  position:absolute;
  top:0;
  left:0;
  background:${({theme}) => theme === 'dark' ? `url('${BG_MOBILE_DARK}')` : `url('${BG_MOBILE_LIGHT}')`};
  background-repeat:no-repeat; 
  background-size:cover;
  z-index:-1000;
  @media(min-width:650px){
    background:none;
    background:${({theme}) => theme === 'dark' ? `url('${BG_DESKTOP_DARK}')` : `url('${BG_DESKTOP_LIGHT}')`};
    background-repeat:no-repeat;
    background-size:cover;
    height:300px;
  }
`;

function App() {
  let [theme,setTheme] = useState('dark');
 
  return (
  <>
    <Todo theme={theme} setTheme={setTheme}></Todo>
    <GlobalStyle theme={theme}/>
    <BackgroundImage theme={theme}/>
  </>
  );
}

export default App;
