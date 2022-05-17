import React,{useState,useEffect} from "react";
import styled from 'styled-components';
import Footer from "./Footer";
import Header from "./Header";
import List from "./List";



interface List {
    value:string;
    completed:boolean;
    active:string;
}
export type Props = {
    theme?:string;
    setTheme?:any;
    setList?:any;
    list?:List[];
}

const Container = styled.div`
    min-width:400px;
    width:60vw;
    margin-top:3rem;
    @media (min-width:1150px){
        max-width:700px;
        margin-top:6rem;
    }
`;

function Todo({theme,setTheme}:Props){
    let [list,setList] = useState([{value:'Eggs',completed:false,active:'All'},
                                   {value:'Bread',completed:false,active:'All'},
                                   {value:'Milk',completed:false,active:'All'},
                                   {value:'Potatoes',completed:false,active:'All'}]);
                                  
    useEffect(()=>{
        const getData = JSON.parse(localStorage.getItem('list') || '[]');
        setList(getData);
    },[]);
    
    return (
        <Container>
            <Header theme={theme} setTheme={setTheme} list={list} setList={setList}></Header>
            <List list={list} setList={setList} theme={theme}></List>
            <Footer list={list} setList={setList} theme={theme}></Footer>
        </Container>
    )
}


export default Todo;