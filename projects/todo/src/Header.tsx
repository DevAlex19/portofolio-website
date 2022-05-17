import React,{useRef} from "react";
import styled from "styled-components";
import { Props } from "./Todo";
import { VERY_DARK_DESATURATED_BLUE,DARK_GRAYISH_BLUE,ICON_SUN, ICON_MOON,LIGHT_GRAYISH_BLUE_THEME,VERY_DARK_GRAYISH_BLUE_THEME, ICON_CHECK } from "./Resources";

const HeaderContainer = styled.div`
`;
const LogoContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`;
const Logo = styled.div`
   color:white;
   font-size:2rem;
   letter-spacing:8px;
   font-weight:bold;
`;
const InputContainer = styled.div`
    background:${({theme}) => theme === 'dark' ? VERY_DARK_DESATURATED_BLUE : 'white'};
    display:flex;
    padding:1rem 1rem 1rem 1.5rem;
    border-radius:5px;
    margin-top:3rem;
`;
const AddRow = styled.div`
    width:26px;
    height:26px;
    border-radius:50% ;
    border:1px solid ${({theme}) => theme === 'dark' ? DARK_GRAYISH_BLUE : LIGHT_GRAYISH_BLUE_THEME};
    margin-right:1rem;
    cursor:pointer;
    &:hover{
        background:url('${ICON_CHECK}'),linear-gradient(135deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%));
        background-repeat:no-repeat;
        background-position:center;
    }
`;
const Input = styled.input`
    outline:none;
    font-size:1rem;
    border:none;
    background:none;
    flex:1;
    caret-color:${DARK_GRAYISH_BLUE};
    color:${({theme}) => theme === 'dark' ? LIGHT_GRAYISH_BLUE_THEME : VERY_DARK_GRAYISH_BLUE_THEME};
`;


function Header({theme,setTheme,list,setList}:Props){
    const inputElement = React.useRef() as React.MutableRefObject<HTMLInputElement>;
      
    function addItem(e:any){
        const value = inputElement.current.value;
        if(list && value && (e.key === 'Enter' || e.target.dataset.type === 'additem')){
            const listElements = [...list,{value,completed:false,active:'All'}];
            setList(listElements);
            localStorage.setItem('list',JSON.stringify(listElements));
            inputElement.current.value = '';
        }
    }
   
   
    return <HeaderContainer>
        <LogoContainer>
            <Logo theme={theme}>TODO</Logo>
            <img style={{cursor:'pointer'}} onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} src={`${theme === 'dark' ? ICON_SUN : ICON_MOON}`}/>
        </LogoContainer>
        <InputContainer theme={theme}>
            <AddRow data-type="additem" onClick={addItem} theme={theme}/>
            <Input onKeyDown={addItem} type="text" ref={inputElement} theme={theme} placeholder="Create a new todo..."/>
        </InputContainer>
    </HeaderContainer>
}


export default Header;