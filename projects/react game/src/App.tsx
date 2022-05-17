import React,{useState} from 'react';
import Header from './Header';
import {createGlobalStyle} from 'styled-components';
import './style.css';
import Main from './Main';
import Footer from './Footer';

export type ScoreProps = {
  score:number;
  setScore?:any;
}

const GlobalStyle = createGlobalStyle``;

function App() {
  let [score,setScore] = useState(0);
 

  return (<>
    <Header score={score}></Header>
    <Main setScore={setScore} score={score}></Main>
    <Footer/>
    <GlobalStyle/>
  </>
  );
}

export default App;
