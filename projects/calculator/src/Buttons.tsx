import React from 'react';
import styled from 'styled-components';
import {KEY_BACKGROUND_ORANGE,KEY_SHADOW_ORANGE,TEXT_BLUE,
KEY_BACKGROUND_BLUE,KEY_BACKGROUND_RED,THEMES_NAME,
KEYPAD_BACKGROUND_WHITE,KEYPAD_BACKGROUND_VIOLET,TOGGLE_BACKGROUND_BLUE,
KEY_BACKGROUND_CYAN,KEY_TOGGLE_ORANGE, TOGGLE_BACKGROUND_CYAN,KEY_BACKGROUND_DARK_VIOLET,KEY_TEXT_YELLOW,
KEY_TEXT_LIGHT_YELLOW,KEY_TEXT_BLUE,KEY_BACKGROUND_LIGHT_YELLOW,KEY_BACKGROUND_VIOLET,
KEY_SHADOW_BLUE,KEY_BACKGROUND_RED_SHADOW,KEY_SHADOW_CYAN,KEY_SHADOW_DARK_ORANGE,
KEY_SHADOW_GRAYISH_ORANGE,KEY_SHADOW_MAGENTA,KEY_SHADOW_SOFT_CYAN,KEY_SHADOW_DARK_MAGENTA} from './Colors';
import { ThemeProps} from './Header';

const ButtonsContainer = styled.div`
    background:${({theme}) => theme === 'blue' ? TOGGLE_BACKGROUND_BLUE : theme === 'white' ? KEYPAD_BACKGROUND_WHITE : KEYPAD_BACKGROUND_VIOLET};
    border-radius:10px;
    padding:1.5rem;
    display:grid;
    grid-template-columns:repeat(4,60px);
    grid-template-rows:repeat(5,65px);
    justify-content:space-between; 
    grid-row-gap:15px;
    margin-top:1.6rem;
`;
const Button = styled.div<{btn?:boolean,color?:string,theme?:string}>`
    cursor:pointer;
    width:${({btn}) => btn ? '100%' : '60px'};
    height:65px;
    border-radius:5px;
    background:${({color,theme}) => theme === 'blue' ?
                color === 'blue' ? KEY_BACKGROUND_BLUE : color === 'red' ? KEY_BACKGROUND_RED : KEY_BACKGROUND_ORANGE :
                theme === 'white' ?
                color === 'blue' ?  KEY_BACKGROUND_CYAN: color === 'red' ? KEY_TOGGLE_ORANGE: KEY_BACKGROUND_LIGHT_YELLOW :
                color === 'blue' ? KEY_BACKGROUND_VIOLET : color === 'red' ? TOGGLE_BACKGROUND_CYAN : KEY_BACKGROUND_DARK_VIOLET 
 };
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:${({color}) => color === 'red' || color === 'blue' ? '1.4rem' : '2.3rem'};
    box-shadow:0 4px ${({color,theme}) => theme === 'blue' ?
                    color === 'blue' ? KEY_SHADOW_BLUE : color === 'red' ? KEY_BACKGROUND_RED_SHADOW : KEY_SHADOW_ORANGE :
                    theme === 'white' ?
                    color === 'blue' ?  KEY_SHADOW_CYAN : color === 'red' ? KEY_SHADOW_DARK_ORANGE : KEY_SHADOW_GRAYISH_ORANGE :
                    color === 'blue' ? KEY_SHADOW_MAGENTA : color === 'red' ? KEY_SHADOW_SOFT_CYAN : KEY_SHADOW_DARK_MAGENTA 
};
    color:${({color,theme}) => theme === 'blue' ?
                               color === 'blue' || color === 'red' ? 'white' : TEXT_BLUE :
                               theme === 'white' ?
                               color === 'blue' || color === 'red' ? 'white' : KEY_TEXT_YELLOW :
                               color === 'blue' ? 'white' : color === 'red' ? KEY_TEXT_BLUE : KEY_TEXT_LIGHT_YELLOW 
                            };
    
    &:active{
        transform:translateY(3px);
        box-shadow:0 1px ${({color,theme}) => theme === 'blue' ?
        color === 'blue' ? KEY_SHADOW_BLUE : color === 'red' ? KEY_BACKGROUND_RED_SHADOW : KEY_SHADOW_ORANGE :
        theme === 'white' ?
        color === 'blue' ?  KEY_SHADOW_CYAN : color === 'red' ? KEY_SHADOW_DARK_ORANGE : KEY_SHADOW_GRAYISH_ORANGE :
        color === 'blue' ? KEY_SHADOW_MAGENTA : color === 'red' ? KEY_SHADOW_SOFT_CYAN : KEY_SHADOW_DARK_MAGENTA 
};
    }
`;
function Buttons({changeTheme:{theme,result,setValue,setResult,value}}:ThemeProps){
    const operators = ['+','-','/','x'];
    function changeValue(e:any){
        let current = e.target.textContent;
        let prev = value?.split(' ');
        if(value){
            let str = value?.replace(/\s/g,"");
            if(['x','/','+'].includes(str[str.length - 1]) && ['x','/','+'].includes(current))return;
            if(['-','+'].includes(str[str.length - 1]) && ['+','-'].includes(current))return;
            if(str[str.length - 1] === '-' && ['x','/','+'].includes(current))return
        }
       
        if(prev && prev[prev.length - 1] === '.' && operators.includes(current))return;
        if(prev && prev[prev.length - 1] === '0' && current !== '0' && current !== '.'){
            setValue(prev?.join(' ') + "." + current);
            return;
        };
        if(prev && prev[prev.length - 1] === '0' && current === '0')return;
        if(['+','x','/'].includes(current) && value === '')return;
        if(prev && prev[prev.length - 1].includes('.') && current === '.')return;
        if(operators.includes(current)){
            let temp = prev?.filter(item => item);
            if(temp && ['x','/'].includes(temp[temp.length - 1]) && current === '-'){
                setValue(prev?.join(' ') + current);
            }else{
                
                setValue(prev?.join(' ') + ' ' + current + " ");
            }
            
        }else{
            setValue(prev?.join(' ') + current);
        }
       
       
    }

   
    function deleteNumber(){
        if(value){
            let temp = value?.split(' ');
            if(temp && +temp[temp.length - 1]){
                setValue(temp.join(' ').slice(0,-1));
                return;
            }
            setValue(value.slice(0,-2));
        } 
    }
    return <ButtonsContainer theme={THEMES_NAME[theme]}>
        {[0,1,2,3,4,5,6,7,8,9].map(number => <Button theme={THEMES_NAME[theme]} onClick={changeValue} className={`item${number}`} key={number}>{number}</Button>)}
        <Button onClick={changeValue} theme={THEMES_NAME[theme]} className='item10'>+</Button>
        <Button onClick={changeValue} theme={THEMES_NAME[theme]} className='item11'>-</Button>
        <Button onClick={changeValue} theme={THEMES_NAME[theme]} className='item12'>x</Button>
        <Button onClick={changeValue} theme={THEMES_NAME[theme]} className='item13'>/</Button>
        <Button onClick={changeValue} theme={THEMES_NAME[theme]} className='item14'>.</Button>
        <Button onClick={()=>deleteNumber()}theme={THEMES_NAME[theme]} color='blue' className='item15'>DEL</Button>
        <Button onClick={()=>{
            if(value){
                let temp = value.replace(/x/g,'*');
                let arr = temp.split(' ').reverse();
                let result;
                let findNumber = arr[0];
            
                while(isNaN(parseFloat(findNumber))){
                    arr.shift();
                    findNumber = arr[0];
                }
                result = eval(arr.reverse().join(' ')).toLocaleString().replace(/,/g,'.');
                setValue(result);
            }
            
        }}theme={THEMES_NAME[theme]} btn={true} color='red' className='item16'>=</Button>
        <Button onClick={()=>setValue('')}theme={THEMES_NAME[theme]} btn={true} color='blue' className='item17'>RESET</Button>
    </ButtonsContainer>
}

export default Buttons;