import React from "react";
import { Theme } from "./App";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const ModalContainer = styled.div<{modal?:boolean,theme?:string}>`
    position:fixed;
    top:0;
    left:0;
    scroll-behavior:none;
    width:100%;
    overflow-y:auto;
    height:100%;
    display:${({modal}) => modal === true ? 'block' : 'none'};
    background:${({theme}) => theme === 'dark' ? 'hsl(207, 26%, 17%)' : 'hsl(0, 0%, 95%)'};
    padding:2rem 1.5rem;
    padding-top:110px;
    &::-webkit-scrollbar{
        display:none;
    }
    @media (min-width:1000px){
        padding:8.5rem 5rem;
    }
    `;
const Button = styled.div`
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 22%)' : 'white'};
    width:110px;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0.5rem 0;
    margin-top:1.5rem;
    border-radius:5px;
    box-shadow:${({theme}) => theme === 'dark' ? '2px 2px 5px hsl(209, 23%, 12%), -2px -2px 5px hsl(209, 23%, 12%)' : '2px 2px 5px hsl(0, 0%, 85%), -2px -2px 5px hsl(0, 0%, 85%)'};
    &:hover{
        background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 10%)' : ' hsl(0, 0%, 85%)'};
    }
`;
const CountryDescription = styled.div`
    margin-top:5rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }
    @media (min-width:1000px){
        flex-direction:row;
        justify-content:space-between;
        margin:0;
        margin-top:4rem;
    }
    @media (min-width:1140px){
        justify-content:space-evenly;
    }
`;
const DescriptionContainer = styled.div`

@media (min-width:1000px){
    margin-left:3rem;
}
`;
const Title = styled.div`
    margin-top:2.8rem;
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    font-size:1.5rem;
    margin-bottom:1.3rem;
    font-weight:bold;
`;
const CountryDetails = styled.div`
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    & div p{
        margin-bottom:0.8rem;
    }
    & div span{
        font-size:0.9rem;
        color:${({theme}) => theme === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 40%)'};
    }
    & div:last-child{
        margin-top:3rem;
    }
    @media (min-width:700px){
        display:flex;
        & div:last-child{
            margin-top:0;
            margin-left:5rem;
        }
    }
`;
const ImgContainer = styled.div`
    width:350px;
    height:210px;
    @media (min-width:1000px){
        min-width:400px;
        min-height:250px;
    }
    @media (min-width:1250px){
        min-width:500px;
        width:400px;
        min-height:350px;
    }
`;
const BorderCountries = styled.div`
    margin-top:3rem;
    font-size:1.2rem;
    padding-bottom:3rem;
    p{
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    }
    div{
        margin-top:1.2rem;
        display:flex;
        flex-wrap:wrap;
        width:270px;
    }
    div button{
        border:none;
        background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 22%)' : 'white'};
        color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
        padding:0.5rem 1.5rem;
        cursor:pointer;
        border-radius:5px;
        margin-bottom:0.8rem;
        margin-left:0.8rem;
        box-shadow:${({theme}) => theme === 'dark' ? '2px 2px 5px hsl(209, 23%, 12%), -2px -2px 5px hsl(209, 23%, 12%)' : '2px 2px 5px hsl(0, 0%, 85%), -2px -2px 5px hsl(0, 0%, 85%)'};
    }
    div button:hover{
        background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 10%)' : ' hsl(0, 0%, 85%)'};
    }
    
    @media (min-width:1140px){
        display:flex;
        div{
            margin:0;
            margin-left:2rem;
        }
    }
`;

const obj = {
    flags:{png:''},
    name:{common:''},
    population:'',
    region:'',
    altSpellings:'',
    subregion:'',
    capital:'',
    tld:'',
    currencies:'',
    languages:'',
    borders:''
}

function CountryModal({theme,modal,setModal,card,country,setCountry}:Theme){

    // let {flags:{png},name:{common},population,region,altSpellings,subregion,capital,tld,currencies,languages,borders} = country[0];
   
    function changeCountry(e:any){
        const value = e.target.textContent;
        const countries = [...card].filter(item => item.cca2 === value || item.cca3 === value || item.ccn3 === value || item.cioc === value);
        setCountry(countries);
    }
    return <ModalContainer modal={modal} theme={theme}>
        <Button onClick={() => setModal(false)} theme={theme}><FontAwesomeIcon style={{margin:'0 0.7rem 0 0'}} icon={faArrowLeftLong}></FontAwesomeIcon>Back</Button>
        {country ? <CountryDescription>
            <ImgContainer><img src={country[0].flags.png}/></ImgContainer>
            <DescriptionContainer>
                <Title theme={theme}>{country[0].name.common}</Title>
                <CountryDetails theme={theme}>
                    <div>
                        <p>Native Name: <span>{country[0].name.official}</span></p>
                        <p>Population: <span>{country[0].population.toLocaleString('en-US')}</span></p>
                        <p>Region: <span>{country[0].region}</span></p>
                        <p>Sub Region: <span>{country[0].subregion}</span></p>
                        <p>Capital: <span>{country[0].capital}</span></p>
                    </div>
                    <div>
                        <p>Top Level Domain: <span>{country[0].tld[0]}</span></p>
                        <p>Currencies: <span>{
                            //@ts-ignore
                            Object.values(country[0].currencies)[0].name
                            }</span></p>
                        <p>Languages: <span>{Object.values(country[0].languages).join(', ')}</span></p>
                    </div>
                </CountryDetails>
                {country[0].borders ? <BorderCountries theme={theme}>
                    <p>Border Countries:</p>
                    <div>
                       {
                           country[0].borders.map((item:string,index:number) =>{
                               return <button onClick={changeCountry} key={index}>{item}</button>
                           }) 
                       }
                    </div>
                </BorderCountries> : null}
            </DescriptionContainer>
        </CountryDescription>: null}
    </ModalContainer>
}


export default CountryModal;