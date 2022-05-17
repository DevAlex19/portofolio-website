import React,{useState} from 'react';
import styled,{createGlobalStyle} from 'styled-components';
import Display from './Display';
import Buttons from './Buttons';
import Header from './Header';
import './styles/style.css';
import { THEMES_NAME,MAIN_BACKGROUND_BLUE, MAIN_BACKGROUND_WHITE,
MAIN_BACKGROUND_VIOLET } from './Colors';

const GlobalStyle = createGlobalStyle<{theme?:string}>`
    body{
        display:flex;
        height:100vh;
        justify-content:center;
        align-items:center;
        font-size:32px;
        background:${({theme})=> theme === 'blue' ? MAIN_BACKGROUND_BLUE : theme === 'white' ? MAIN_BACKGROUND_WHITE : 
    MAIN_BACKGROUND_VIOLET};
    }
`;
const Container = styled.div`
    min-width:400px;
    max-width:400px;
    padding:2rem;
`;


function App(){
    let [theme,setTheme] = useState(0);
    let [value,setValue] = useState("");
    
    let [result,setResult] = useState('');
    return <>
        <Container>
            <Header changeTheme={{theme,setTheme}}/>
            <Display changeTheme={{theme,setTheme,value,setValue,result,setResult}} />
            <Buttons changeTheme={{theme,setTheme,value,setValue,result,setResult}}/>
        </Container>
        <GlobalStyle theme={THEMES_NAME[theme]}/>
    </>
}

export default App;