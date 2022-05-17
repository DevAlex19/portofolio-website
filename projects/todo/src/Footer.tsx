import React,{useState} from "react";
import styled from 'styled-components';
import { VERY_DARK_DESATURATED_BLUE,VERY_DARK_GRAYISH_BLUE,
DARK_GRAYISH_BLUE_THEME_WHITE,VERY_LIGHT_GRAY,VERY_DARK_GRAYISH_BLUE_THEME,
BRIGHT_BLUE } from "./Resources";
import { Props } from "./Todo";

const FooterContainer = styled.div`
    position:relative;
   
`;
const FooterDetails = styled.div`
    display:flex;
    background:${({theme}) => theme === 'dark' ? VERY_DARK_DESATURATED_BLUE : 'white'};
    color:${({theme}) => theme === 'dark' ? VERY_DARK_GRAYISH_BLUE : DARK_GRAYISH_BLUE_THEME_WHITE};
    padding:1.3rem 1rem 1.3rem 1.5rem;
    justify-content:space-between;
    align-items:center;
    border-bottom-left-radius:5px;
    border-bottom-right-radius:5px;
`;
const ItemsLeft = styled.p`
    cursor:pointer;
`;
const RowsState = styled.div`
    position:absolute;
    top:80px;
    width:100%;
    left:0;
    border-radius:5px;
    display:flex;
    justify-content:center;
    padding:1.3rem 0;
    background:${({theme}) => theme === 'dark' ? VERY_DARK_DESATURATED_BLUE : 'white'};
    color:${({theme}) => theme === 'dark' ? VERY_DARK_GRAYISH_BLUE : DARK_GRAYISH_BLUE_THEME_WHITE};
    font-weight:bold;
    
}`;

const ClearRows = styled.p`
cursor:pointer;    
transition:color 0.5s;
&:hover{
    color:${({theme}) => theme === 'dark' ? VERY_LIGHT_GRAY : VERY_DARK_GRAYISH_BLUE_THEME}
    }
    
`;
const StateButtons = styled.p<{selected?:string,theme?:string}>`
    cursor:pointer;
    transition:color 0.5s;
    color:${({selected}) => selected ? BRIGHT_BLUE : ''};
    &:nth-child(2){
        margin-left:1.2rem;
    }
    &:nth-child(3){
        margin-left:1.2rem;
    }   
    &:hover{
    color:${({theme}) =>  theme === 'dark' ? VERY_LIGHT_GRAY : VERY_DARK_GRAYISH_BLUE_THEME}
    }
    
    
`;
function Footer({theme,list,setList}:Props){
    const selected = list && list[0] ? list[0].active : 'All';
    
    function clearCompleted(){
        if(list){
            let newList = [...list].filter(item => item.completed === false);
            setList(newList);
            localStorage.setItem('list',JSON.stringify(newList));
        }
        
    }
    function filterList(e:any){
        const target = e.target.textContent;
        
        if(list){
            const newList = [...list];
            if(target === 'All'){
                newList.forEach(item => item.active = 'All');
                setList(newList);
                localStorage.setItem('list',JSON.stringify(newList));
            }
            if(target === 'Active'){
                newList.forEach(item => item.active = 'Active');
                setList(newList);
                localStorage.setItem('list',JSON.stringify(newList));
            }
            if(target === 'Completed'){
                newList.forEach(item => item.active = 'Completed');
                setList(newList);
                localStorage.setItem('list',JSON.stringify(newList));
            }
           
        }
        
    }

    return <FooterContainer>
        <FooterDetails theme={theme}>
            <ItemsLeft>{list?.length} items left</ItemsLeft>
            <RowsState theme={theme}>
                <StateButtons  selected={selected === 'All' ? selected : ''}theme={theme} onClick={filterList}>All</StateButtons>
                <StateButtons  selected={selected === 'Active' ? selected : ''} theme={theme} onClick={filterList}>Active</StateButtons>
                <StateButtons  selected={selected === 'Completed' ? selected : ''} theme={theme} onClick={filterList}>Completed</StateButtons>
            </RowsState>
            <ClearRows theme={theme} onClick={clearCompleted}>Clear Completed</ClearRows>
        </FooterDetails>
    </FooterContainer>
}

export default Footer;