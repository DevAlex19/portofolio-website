import React,{useState,useRef,useEffect} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Theme } from "./App";
import Cards from "./Cards";
import CountryModal from "./CountryModal";

const MainContainer = styled.div`
    padding:2.5rem 1.5rem;
    position:relative;
`;
const SearchContainer = styled.div`
    @media (min-width:1000px){
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
`;
const InputContainer = styled.div`
    display:flex;
    align-items:center;
    background:red;
    padding:1.3rem 0 1.3rem 2.5rem;
    background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 22%)' : 'white'};
    border-radius:5px;
    @media (min-width:1000px){
        min-width:400px;
        width:600px;
    }
`;
const Input = styled.input`
    background:none;
    outline:none;
    border:none;
    font-size:1.1rem;
    width:100%;
    margin-left:1.5rem;
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(0, 0%, 52%)'};
    caret-color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    &::placeholder{
        color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(0, 0%, 52%)'};
    }
`;
const Icon = styled(FontAwesomeIcon)`
    color:${({theme}) => theme === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(0, 0%, 52%)'};
    font-size:1.3rem;
`;
const SelectContainer= styled.div`
    width:250px;
    background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 22%)' : 'white'};
    margin-top:3rem;
    border-radius:5px;
    position:absolute;
    @media (min-width:1000px){
        position:relative;
        margin:0;
    }
`;
const SelectInput = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:1rem 1.5rem;
    cursor:pointer;
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    @media (min-width:1000px){
        padding:1.3rem 1.5rem;
    }
`;
const Arrow = styled(FontAwesomeIcon)`
 
`;
const Dropdown = styled.div<{theme?:string,dropdown?:boolean}>`
    position:absolute;
    background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 22%)' : 'white'};
    border-radius:5px;
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    width:100%;
    top:60px;
    overflow:hidden;
    display:${({dropdown}) => dropdown === true ? 'block' : 'none'};
    animation: growDown 300ms ease-in-out forwards;
    transform-origin: top center;
    @keyframes growDown {
        0% {
          transform: scaleY(0)
        }
        80% {
          transform: scaleY(1.1)
        }
        100% {
          transform: scaleY(1)
        }
      }
`;
const DropdownItem = styled.div`
    cursor:pointer;
    padding:0.8rem 1.5rem;
    background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 22%)' : 'white'};
    &:hover{
        background:${({theme}) => theme === 'dark' ? 'hsl(207, 26%, 17%)' : ' hsl(0, 0%, 90%)'};
    }
`;

const API = 'https://restcountries.com/v3.1/all';

function Main({theme,modal,setModal}:Theme){
    let [dropdown,setDropdown] = useState(false);
    const dropContent = useRef<any>();
    let [dropdownValue,setDropdownValue] = useState('Filter by Region');
    let [card,setCard] = useState([]);
    let [country,setCountry] = useState();
    let [filteredCountries,setFilteredCountries] = useState([]);
    let [filteredData,setFilteredData] = useState([]);
    let [inputVal,setInputVal] = useState('');

    function filterData(e:any){
        const value = e.target.textContent;
        const newData = card.filter((item:any) => item.region.includes(value));
        setFilteredData(newData);
    }
  
    function selectDropdown(e:any){
        e.stopPropagation();
        let value = e.target.textContent;
        if(value && value !== dropContent.current.textContent){
            setDropdownValue(value);
        }
        setDropdown(!dropdown);
       
    }
    function filterCountries(e:any){
        const value = e.target ? e.target.value : inputVal;
        const newList = [...filteredData].filter(({name:{common}}:any) => {
                return common.toLowerCase().includes(value);
        });
        setFilteredCountries(newList);    
        setInputVal(value);   
    }
   useEffect(()=>{
       filterCountries(inputVal)
   },[dropdownValue])
 
    useEffect(() => {
        getCountries();
    },[])

    async function getCountries(){
            const getData = await fetch(API);
            const data = await getData.json();
            setCard(data);
            setFilteredData(data)
    }
   
    useEffect(()=>{
        document.addEventListener('click',handleClickOutside);
        return () =>{
            document.removeEventListener('click',handleClickOutside);
        }
    },[dropdown])
    function handleClickOutside(e:any){
        if(dropContent.current && !dropContent.current.contains(e.target)){
            setDropdown(false);
        }
    }
    
    return <MainContainer>
        <SearchContainer>
            <InputContainer onChange={(e:any)=>filterCountries(e)} theme={theme}>
                <Icon theme={theme} icon={faSearch} />
                <Input theme={theme} type="text" placeholder="Search for a country..."/>
            </InputContainer>
            <SelectContainer onClick={selectDropdown} theme={theme}>
                <SelectInput theme={theme}>
                    <p>{dropdownValue}</p>
                    <Arrow icon={faAngleDown}></Arrow>
                </SelectInput>
                <Dropdown ref={dropContent} dropdown={dropdown} theme={theme}>
                    {['Africa','America','Asia','Europe','Oceania'].map((item,index) => {
                        return <DropdownItem onClick={filterData} key={index} theme={theme}>{item}</DropdownItem>;
                    })}
                </Dropdown>
            </SelectContainer>
        </SearchContainer>
        <Cards inputVal={inputVal} dropdownValue={dropdownValue} filteredCountries={filteredCountries} setCountry={setCountry} filteredData={filteredData} modal={modal} setModal={setModal} theme={theme}></Cards>
        <CountryModal country={country} setCountry={setCountry} card={card} modal={modal} setModal={setModal} theme={theme}></CountryModal>
    </MainContainer>
}

export default Main;