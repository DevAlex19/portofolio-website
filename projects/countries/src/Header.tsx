import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun,faMoon } from '@fortawesome/free-solid-svg-icons';
import { Theme } from "./App";

const HeaderContainer = styled.div<{theme?:string,modal?:boolean}>` 
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 22%)' : 'white'};
    padding:1.8rem 0.8rem;
    position:${({modal}) => modal === true ? 'fixed' : 'relative'};
    z-index:1000;
`;
const Title = styled.h1`
    font-size:1.2rem;
`;
const ThemeContainer = styled.div`
    display:flex;
    align-items:center;
    cursor:pointer;
`;
const ThemeName = styled.p`
    margin-left:0.8rem;
`;

function Header({theme,setTheme,modal}:Theme){
    return <HeaderContainer modal={modal} theme={theme}>
        <Title>Where in the world?</Title>
        <ThemeContainer onClick = {()=> theme === 'dark' ? setTheme('light') : setTheme('dark') }>
            <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} />
            <ThemeName>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</ThemeName>
        </ThemeContainer>
    </HeaderContainer>
}
export default Header;