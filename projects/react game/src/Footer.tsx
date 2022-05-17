import React,{useState,useRef,useEffect} from "react";
import styled,{createGlobalStyle} from "styled-components";

const RulesContainer = styled.div<{modal?:boolean}>`
   background:hsl(237, 49%, 15%,0.7);
   width:100vw;
   height:100vh;
   position:absolute;
   top:0;
   left:0;
   z-index:99999;
   display:${({modal}) => modal === true ? 'block' : 'none'};
`;
const Button = styled.button`
    background:none;
    outline:none;
    border:1px solid white;
    color:white;
    padding:0.8rem;
    border-radius:10px;
    width:120px;
    font-size:1.1rem;
    letter-spacing:2px;
    cursor:pointer;
    display:block;
    margin:auto;
    margin-top:9rem;
    transition:background 0.5s, color 0.5s;
    &:hover{
        background:white;
        color:black;
    }

`;
const Background = styled.div<{modal?:boolean}>`
    position:absolute;
    z-index:10000;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background:white;
    border-radius:10px;
    padding:2rem 2.5rem 3.5rem;
    div{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:2rem;
    }
    div p{
        font-size:1.8rem;
        color:hsl(229, 25%, 31%);
        font-weight:bolder;
    }
    div img{
        cursor:pointer;
    }`;

const GlobalStyle = createGlobalStyle<{modal?:boolean}>`
    body{
        overflow-y:${({modal}) => modal === true ? 'hidden' : 'auto'};
    }
`;


function Footer(){
    let [modal,setModal] = useState(false);


    return <div>
        <Button onClick={(e) => {
            setModal(!modal);
        }}>RULES</Button>
        <RulesContainer modal={modal}>
            <Background modal={modal}>
            <div>
                <p>RULES</p>
                <img onClick={() => setModal(false)} className="close" src="./images/icon-close.svg"/>
            </div>
            <img src="./images/image-rules-bonus.svg"/>
            </Background>
        </RulesContainer>
        <GlobalStyle modal={modal}/>
    </div>
}

export default Footer;