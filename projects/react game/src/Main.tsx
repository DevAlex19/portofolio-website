import React,{useState,useRef,useEffect} from "react";
import styled from 'styled-components';
import { data,setWinner } from "./resources/resources";
import { ScoreProps } from "./App";


const MainContainer = styled.div<{active?:boolean}>`
    display:flex;
    justify-content:center;
    position:relative;
    width:560px;
    margin:auto;
    margin-top:10rem;
    opacity:1;
    transition:opacity:0.5s;
    img.active{
        opacity:0;
    }
`;
const Container = styled.div``;
const ImageContainer = styled.div<{win?:string}>`
    border-radius:50%;
    position:absolute;
    display:flex;
    cursor:pointer;
    width:140px;
    height:140px;
    align-items:center;
    justify-content:center;
    transition:transform 0.5s, top 0.5s , left 0.5s, opacity 0.7s,box-shadow 1s;

    &:nth-child(1){
        background:linear-gradient(120deg, hsl(39, 89%, 49%), hsl(40, 84%, 53%));
        box-shadow:${({win}) => win === 'YOU WIN' ? '0 6px hsl(39, 100%, 35%), 0 0 0 30px hsl(217, 16%, 45%,0.1),0 0 0 60px hsl(217, 16%, 45%,0.1),0 0 0 90px hsl(217, 16%, 45%,0.1)' : '0 6px hsl(39, 100%, 35%)'};
        top:-70px;
        left:205px;
    }
    
    &:nth-child(2){
        background:linear-gradient(120deg, hsl(230, 89%, 62%), hsl(230, 89%, 65%));
        box-shadow:${({win}) => win === 'YOU WIN' ? '0 6px hsl(230, 89%, 57%), 0 0 0 30px hsl(217, 16%, 45%,0.1),0 0 0 60px hsl(217, 16%, 45%,0.1),0 0 0 90px hsl(217, 16%, 45%,0.1)' : '0 6px hsl(230, 89%, 57%)'};
        left:370px;
        top:30px;
    }
    &:nth-child(3){
        background:linear-gradient(120deg, hsl(349, 71%, 52%), hsl(349, 70%, 56%));
        box-shadow:${({win}) => win === 'YOU WIN' ? '0 6px hsl(349, 60%, 36%), 0 0 0 30px hsl(217, 16%, 45%,0.1),0 0 0 60px hsl(217, 16%, 45%,0.1),0 0 0 90px hsl(217, 16%, 45%,0.1)' : '0 6px hsl(349, 60%, 36%)'};
        top:235px;
        left:310px;
    }
    &:nth-child(4){
        background:linear-gradient(120deg, hsl(261, 73%, 60%), hsl(261, 72%, 63%));
        box-shadow:${({win}) => win === 'YOU WIN' ? '0 6px hsl(261, 72%, 50%), 0 0 0 30px hsl(217, 16%, 45%,0.1),0 0 0 60px hsl(217, 16%, 45%,0.1),0 0 0 90px hsl(217, 16%, 45%,0.1)' : '0 6px hsl(261, 72%, 50%)'};
        left:120px;
        top:235px;
    }
    &:nth-child(5){
        background:linear-gradient(120deg, hsl(189, 59%, 53%), hsl(189, 58%, 57%));
        box-shadow:${({win}) => win === 'YOU WIN' ? '0 6px hsl(189, 58%, 35%), 0 0 0 30px hsl(217, 16%, 45%,0.1),0 0 0 60px hsl(217, 16%, 45%,0.1),0 0 0 90px hsl(217, 16%, 45%,0.1)' : '0 6px hsl(189, 58%, 35%)'};
        top:30px;
        left:45px;
    }
    &::before{
        content:'';
        position:absolute;
        width:110px;
        height:110px;
        background:white;
        border-radius:50%;
        z-index:1;
        box-shadow:inset 0 6px #ddd;
    }
    &:hover{
        transform:scale(1.1);
    }

    img{
        z-index:2;
    }
    p{
        position:absolute;
        color:white;
        top:-50px;
        letter-spacing:2px;
        font-size:1.3rem;
    }
    &.active{
        left:${({win}) => win !== '' ? '-60px' : '0px'};
        top:150px;
        transform:scale(1.4);
    }
  
    &.inactive{
        left:400px;
        top:150px;
        transform:scale(1.4);
        opacity:0;
    }
    &.active:hover{
        transform:scale(1.6);
    }
    @media (max-width:830px){
        width:110px;
        height:110px;
        &::before{
            width:85px;
            height:85px;
        }
        &:nth-child(1){
            top:-60px;
            left:225px;
        }
        &:nth-child(2){
            left:380px;
            top:50px;
        }
        &:nth-child(3){
            top:235px;
            left:330px;
        }
        &:nth-child(5){
            top:55px;
            left:75px;
        }
        &.active{
            left:${({win}) => win !== '' ? '90px' : '90px'};
            top:-20px;
            transform:scale(1.4);
        }
        &.inactive{
            left:350px;
            top:-20px;
            transform:scale(1.4);
            opacity:0;
        }
        p{
            top:120%;
            font-size:1rem;
            left:10px;
        }
        
    }
`;
const CircleContainer = styled.div<{active?:string,win?:string}>`
    position:absolute;
    height:140px;
    width:${({active}) => active === 'active' ? '140px' : '0px'};
    background:hsl(214, 47%, 17%);
    border-radius:50%;
    left:${({win}) => win !== '' ? '480px' : '400px'};
    top:150px;
    z-index:-1;
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:${({active}) => active === 'active' ? '1' : '0'};
    transition:opacity 1s, left 0.5s, top 0.5s;
    z-index:1;
    img{
    z-index:3;
    }
    @media (max-width:830px){
        width:${({active}) => active === 'active' ? '110px' : '0px'};
        height:110px;
        left:${({win}) => win !== '' ? '350px' : '350px'};
        top:-20px;
    }
   
`;
const RandomChoiceContainer = styled.div<{color?:string,shadow?:string}>`
        border-radius:50%;
        position:absolute;
        display:flex;
        cursor:pointer;
        width:140px;
        height:140px;
        align-items:center;
        justify-content:center;
        top:0%;
        left:0;
        background:${({color}) => color};
        transform:scale(1.4);
        animation:appear 4s;
        transition:transform 0.5s,box-shadow 1s;
        &:hover{
            transform:scale(1.6);
        }
        @keyframes appear{
            from{
                opacity:0;
            }
            to{
                opacity:1;
            }
        };
        &::before{
            content:'';
            position:absolute;
            width:110px;
            height:110px;
            background:white;
            border-radius:50%;
            z-index:2;
            box-shadow:inset 0 6px #ddd;
        }
        p{
            position:absolute;
            color:white;
            top:-50px;
            width:200px;
            letter-spacing:2px;
            font-size:1.3rem;
        }
        @media (max-width:830px){
            width:110px;
            height:110px;
            &::before{
                width:85px;
                height:85px;
            }
            p{
                top:120%;
                font-size:1rem;
                left:-25px;
            }
        }
`;

const ResultContainer = styled.div`
        position:absolute;
        top:140px;
        display:flex;
        flex-direction:column;
        p{
            color:white;
            font-size:3.5rem;
            letter-spacing:1px;
        }
        @media (max-width:830px){
            top:240px;
        }
       
`;
const Button = styled.button`
        border:none;
        background:white;
        color:hsl(229, 25%, 31%);
        border-radius:5px;
        padding:0.8rem;
        font-size:1rem;
        letter-spacing:1px;
        margin-top:1rem;
        cursor:pointer;
        z-index:10000;
        transition:background 0.3s;
        &:hover{
            background:hsl(217, 16%, 75%);
        }
`;

function Main({score,setScore}:ScoreProps){
    const [elements,setElements] = useState([...data]);
    let [content,setContent] = useState<any>(null);
    let [choice,setChoice] = useState({user:'',computer:''});
    let [win,setWin] = useState('');
    let userChoice = useRef('');

    useEffect(()=>{
        const {user,computer} = choice;
        if(user && computer){
            if(setWinner(choice) === 'winner'){
                setWin('YOU WIN');
                    setScore(score + 1);
            }else if(setWinner(choice) === 'lose'){
                setWin('YOU LOSE');
                if(score > 0){
                    setScore(score - 1);
                }
            }else{
                setWin('DRAW');
            }
        }
    },[choice]);

   

    function setClass(e:any,index:number){
        if(elements.some(items => items.class === '')){
            const newData = [...data].map(item => {
                item.class = 'inactive';
                return item
               });
           
               newData[index].class = 'active';
               setChoice({...choice,user:newData[index].value});
               userChoice.current = newData[index].value;
               setElements(newData);
               setTimeout(()=>{
                setContent(computerChoice());
              },1000)
        }
    }

    function computerChoice(){
        const randomNumber = Math.floor(Math.random() * 4);
        setChoice({user:userChoice.current,computer:elements[randomNumber].value});
        return <RandomChoiceContainer color={elements[randomNumber].color} shadow={elements[randomNumber].shadow}>
            <img src={data[randomNumber].url}/>
            <p>{'THE HOUSE PICKED'}</p>
            </RandomChoiceContainer>
    }
    function reset(){
        const newData = [...elements].map(item => {
            item.class = '';
            return item;
        })
        setElements([...newData]);
        setContent(null);
        setChoice({user:'',computer:''});
        setWin('');
    }

    return <MainContainer>
        {win ? <ResultContainer>
            <p>{win}</p>
            <Button onClick={reset}>PLAY AGAIN</Button>
        </ResultContainer> : null}
        <img className={elements.some(item => item.class === 'active') ? 'active' : ''} src="./images/bg-pentagon.svg"/>
        <Container>
        {elements.map((item,index) =>{
            return <ImageContainer win={win} className={item.class === 'active' ? 'active' : item.class === 'inactive' ? 'inactive' : ''} key={index} onClick={(e) => setClass(e,index)}>
                <img src={item.url}/>
                <p>{item.class === 'active' ? 'YOU PICKED' : ''}</p>
            </ImageContainer>
        })}
        </Container>
        <CircleContainer win={win} active={elements.some(item => item.class === 'active') ? 'active' : ''}>
        {content}
        </CircleContainer>
    </MainContainer>
}

export default Main;