import React from "react";
import styled from "styled-components";
import { SCREEN_BACKGROUND_BLUE,THEMES_NAME,LIGHT_YELLOW_TEXT,
SCREEN_BACKGROUND_WHITE,KEYPAD_BACKGROUND_VIOLET } from "./Colors";
import { ThemeProps } from "./Header";

const DisplayContainer = styled.div`
    background:${SCREEN_BACKGROUND_BLUE};
    background:${({theme}) => theme === 'blue' ? SCREEN_BACKGROUND_BLUE : theme === 'white' ? SCREEN_BACKGROUND_WHITE : KEYPAD_BACKGROUND_VIOLET};
    width:100%;
    border-radius:10px;
    margin-top:2rem;
    display:flex;
    align-items:center;
    justify-content:end;
    color:white;
    color:${({theme}) => theme === 'blue' ? 'white' : theme === 'white' ? 'black' : LIGHT_YELLOW_TEXT};
    min-height:90px;
    padding:0 1.5rem;
    overflow:hidden;
`;
const TopDisplay = styled.div`
    font-size:2.6rem;
`;


function Display({changeTheme:{theme,value}}:ThemeProps){
    return <DisplayContainer theme={THEMES_NAME[theme]}>
        <TopDisplay>{value || 0}</TopDisplay>
    </DisplayContainer>
}

export default Display;