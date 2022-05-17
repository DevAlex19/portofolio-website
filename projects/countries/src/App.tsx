import React,{useState} from 'react';
import Header from './Header';
import './style.css';
import Main from './Main';
import { createGlobalStyle } from 'styled-components';

export type Theme = {
  theme?:string;
  setTheme?:any;
  modal?:boolean;
  setModal?:any;
  card?:any;
  country?:any;
  setCountry?:any;
  filteredCountries?:any;
  dropdownValue?:string;
  filteredData?:any;
  inputVal?:string;
}
const GlobalStyle = createGlobalStyle`
  body{
    background:${({theme}) => theme === 'dark' ? 'hsl(207, 26%, 17%)' : 'hsl(0, 0%, 95%)'};
    &::-webkit-scrollbar{
      display:none;
  }
  }
`;

function App() {
  let [theme,setTheme] = useState('dark');
  let [modal,setModal] = useState(false);
  return (
    <>
      <Header modal={modal} setModal={setModal} theme={theme} setTheme={setTheme}></Header>
      <Main modal={modal} setModal={setModal} theme={theme}></Main>
      <GlobalStyle theme={theme}/>
    </>
  );
}

export default App;
