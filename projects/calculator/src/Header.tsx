import React from 'react';
import styled from 'styled-components';
import { TOGGLE_BACKGROUND_BLUE,TOGGLE_BACKGROUND_RED,THEMES_NAME,LIGHT_YELLOW_TEXT,
KEYPAD_BACKGROUND_RED,KEYPAD_BACKGROUND_VIOLET, TOGGLE_BACKGROUND_ORANGE,
TOGGLE_BACKGROUND_CYAN } from './Colors';

export interface ThemeProps{
    changeTheme:ChangeTheme;
}
export type ChangeTheme ={
    theme:number;
    setTheme:any;
    value?:string;
    setValue?:any;
    result?:string;
    setResult?:any;
}

const HeaderContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`;
const Themes = styled.div`
    display:flex;
    justify-content:space-around;
    margin-bottom:0.2rem;
    color:${({theme}) => theme === 'blue' ? 'white' : theme === 'white' ? 'black' : LIGHT_YELLOW_TEXT};
`;
const ChangeTheme = styled.div<{theme:number,changeTheme:string}>`
    position:relative;
    width:70px;
    height:28px;
    background:${({changeTheme}) => changeTheme === 'blue' ? TOGGLE_BACKGROUND_BLUE : changeTheme === 'white' ? KEYPAD_BACKGROUND_RED : KEYPAD_BACKGROUND_VIOLET};
    border-radius:30px;
    cursor:pointer;
    &:before{
        content:'';
        position:absolute;
        width:20px;
        height:20px;
        border-radius:50%;
        background:${({changeTheme}) => changeTheme === 'blue' ? TOGGLE_BACKGROUND_RED : changeTheme === 'white' ? TOGGLE_BACKGROUND_ORANGE : TOGGLE_BACKGROUND_CYAN};
        top:50%;
        left:5px;
        transform:translate(${({theme})=> typeof theme === 'number' ? theme * 20 + 'px' : "0px"},-50%);
        cursor:pointer;
        transition:transform 0.5s;
    }
`;
const Title = styled.div<{theme?:string}>`
    text-transform:lowercase;
    color:${({theme}) => theme === 'blue' ? 'white' : theme === 'white' ? 'black' : LIGHT_YELLOW_TEXT};
    font-size:2.5rem;
`;
const ThemeTitle = styled.div`
    align-self:end;
    padding-bottom:0.2rem;
    margin-right:1.5rem;
    color:${({theme}) => theme === 'blue' ? 'white' : theme === 'white' ? 'black' : LIGHT_YELLOW_TEXT};
`;
const ThemeContainer = styled.div`
    display:flex;
    color:white;
    font-size:1.2rem;
`;




function Header({changeTheme:{theme,setTheme}}:ThemeProps){

    return <HeaderContainer>
        <Title theme={THEMES_NAME[theme]}>Calc</Title>
        <ThemeContainer>
            <ThemeTitle theme={THEMES_NAME[theme]}>THEME</ThemeTitle>
            <div>
                <Themes theme={THEMES_NAME[theme]}>
                    {[1,2,3].map(item => <div key={item}>{item}</div>)}
                </Themes>
                <ChangeTheme theme={theme} changeTheme={THEMES_NAME[theme]} onClick={(e)=> {
                    setTheme((prevState:number) => prevState < 2 ? prevState + 1 : 0);
                }}/>
            </div>
        </ThemeContainer>
    </HeaderContainer>
}


export default Header;