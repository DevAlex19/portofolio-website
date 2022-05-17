import React,{useState,useRef} from "react";
import styled from "styled-components";
import { DARK_GRAYISH_BLUE,LIGHT_GRAYISH_BLUE_THEME,
VERY_DARK_DESATURATED_BLUE,VERY_DARK_GRAYISH_BLUE,VERY_DARK_GRAYISH_BLUE_THEME,ICON_CHECK,
DARK_GRAYISH_BLUE_THEME_WHITE
} from "./Resources";
import { Props } from "./Todo";

const ListContainer = styled.div`
    background:${({theme}) => theme === 'dark' ? VERY_DARK_DESATURATED_BLUE : 'white'};
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    margin-top:1.5rem;
`;
const ListItem = styled.div<{active?:string,theme?:string,completed?:boolean}>`
    display:${({active,completed}) => active === 'All' ? 'flex' : active === 'Active' && completed !== true ? 'flex' : active === 'Completed' && completed === true ? 'flex' : 'none'};
    align-items:center;
    justify-content:space-between;
    padding:1.2rem 1rem 1.2rem 1.5rem;
    border-bottom:1px solid ${({theme}) => theme === 'dark' ? VERY_DARK_GRAYISH_BLUE : LIGHT_GRAYISH_BLUE_THEME};
    @media (min-width:650px){
        img{
            display:none;
        }
        &:hover img{
            display:block;
        }
    }
`;
const RowContainer = styled.div`
    display:flex;
    align-items:center;
    z-index:0;
`;
const CheckRow = styled.div<{completed?:boolean,theme?:string}>`
    width:24px;
    background: ${({completed}) => completed === true ? `url(${ICON_CHECK})` : 'none'},${({theme,completed}) => (theme === 'dark' && completed === true || theme === 'light' && completed === true) ? 'linear-gradient(135deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%))' : theme === 'dark' ? VERY_DARK_DESATURATED_BLUE : 'white'};
    border:none;
    background-repeat:no-repeat;
    background-position:center;
    height:24px;
    border-radius:50% ;
    margin-right:1rem;
    cursor:pointer;
    position:relative;
    &:before{
       position:absolute;
       content:'';
       display:block;
       width:26px;
       height:26px;
       top:50%;
       left:50%;
       background:${({theme}) => theme === 'dark' ? DARK_GRAYISH_BLUE : LIGHT_GRAYISH_BLUE_THEME};
       border-radius:50%;
       transform:translate(-50%,-50%);
       z-index:-1;
    }
    &:hover:before{
        background:linear-gradient(135deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%));
    }
`;
const RowDescription = styled.p<{completed?:boolean,theme?:string}>`
    text-decoration:${({completed})=> completed === true ? 'line-through' : ''};
    font-size:1rem;
    cursor:pointer;
    color:${({theme,completed}) => theme === 'dark' && completed === true ? VERY_DARK_GRAYISH_BLUE : theme === 'dark' && completed !== true ? LIGHT_GRAYISH_BLUE_THEME : theme === 'light' && completed === true ? DARK_GRAYISH_BLUE_THEME_WHITE : VERY_DARK_GRAYISH_BLUE_THEME};
`;

const DeleteRow = styled.img`
    cursor:pointer;
    width:20px;
`;


function List({theme,list,setList}:Props){
    let currentEl = useRef<number>();
    let nextEl = useRef<number>();
    function deleteRow(index:number){
        if(list){
            const newList = [...list].slice(0,index);
            newList.push(...[...list].slice(index + 1))
            setList(newList);
            localStorage.setItem('list',JSON.stringify(newList));
        }
       
    }
 
    
    return (
        <ListContainer  theme={theme}>
            {list?.map((item,index)=>{
                return ( <ListItem  key={index} theme={theme} active={item.active} completed={item.completed}>
                 <RowContainer>
                     <CheckRow onClick={()=>{
                         const newList = [...list];
                         newList[index].completed = !item.completed;
                         setList(newList);
                         localStorage.setItem('list',JSON.stringify(newList));
                        }} theme={theme} completed={item.completed}/>
                     <RowDescription completed={item.completed} theme={theme}>{item.value}</RowDescription>
                 </RowContainer>
                 <DeleteRow onClick={()=>deleteRow(index)} src='./images/icon-cross.svg'/>
             </ListItem>)
            })}
        </ListContainer>
    )
}

export default List;