import React from "react";
import styled from "styled-components";
import { ScoreProps} from './App';

const HeaderContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    min-width:400px;
    width:50vw;
    border:3px solid hsl(217, 16%, 45%);
    padding:1.2rem;
    border-radius:10px;
    margin:auto;
    margin-top:2rem;
    img{
        width:100px;
        margin-left:1rem;
    }
`;
const ScoreContainer = styled.div`
    background:white;
    border-radius:5px;
    padding:1rem 2.5rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    p:first-child{
        color:hsl(229, 64%, 46%);
        letter-spacing:2px;
    }
    p:last-child{
        color:hsl(229, 25%, 31%);
        font-size:4rem;
        font-weight:bolder;
    }
`;

function Header({score}:ScoreProps){
    return <HeaderContainer>
        <img src="./images/logo-bonus.svg"/>
        <ScoreContainer>
            <p>SCORE</p>
            <p>{score || 0}</p>
        </ScoreContainer>
    </HeaderContainer>
}

export default Header;