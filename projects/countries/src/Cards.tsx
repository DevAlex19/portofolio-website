import React,{useEffect, useState,useRef} from "react";
import styled from "styled-components";
import { Theme } from "./App";

const CardsContainer = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fill, 350px);
    justify-content:space-between;
    grid-column-gap: 20px;
    margin-top:9rem;
    @media (max-width:1140px){
        justify-content:space-evenly;
    }
`;
const Card = styled.div`
    width:350px;
    margin-bottom:6rem;
    border-radius:5px;
    overflow:hidden;
    background:${({theme}) => theme === 'dark' ? 'hsl(209, 23%, 22%)' : 'white'};
    color:${({theme}) => theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'};
    cursor:pointer;
    &:hover img{
        transform:scale(1.1);
    }
`;
const ImgContainer = styled.div`
    height:210px;
    overflow:hidden;
    img{
        width:100%;
        height:100%;
        object-fit:cover;
        transition:transform 0.4s;
    }
`;
const CountryName = styled.h3`
    font-size:1.4rem;
    margin-bottom:1rem;
`;
const CountryDetails = styled.p`
    font-size:1.1rem;
    span{
        font-size:1rem;
    }
`;
const CountryInfo = styled.div`
    padding:2rem;
`;



function Cards({theme,setModal,modal,inputVal,filteredData,setCountry,filteredCountries}:Theme){

    function findCountry(name:string){
        const countries = [...filteredData].filter(country => country.name.common === name);
        setCountry(countries);
    }
    
    function checkInput(common:string){
        return filteredCountries.find((item:any) => item.name.common === common);
    }

    return <CardsContainer>
        {filteredData.map( ({flags:{png},name:{common},population,region,capital}:any,index:number) => {
            
        return <Card style={{display: filteredCountries.length === 0 && inputVal === '' || checkInput(common) ? 'block' : 'none'}} key={index} onClick={() => {
            findCountry(common);
            setModal(!modal);
        }} theme={theme}>
                    <ImgContainer>
                        <img src={png}></img>
                    </ImgContainer>
                    <CountryInfo>
                        <CountryName>
                            {common}
                        </CountryName>
                        <CountryDetails>Population: <span>{population}</span></CountryDetails>
                        <CountryDetails>Region: <span>{region}</span></CountryDetails>
                        <CountryDetails>Capital: <span>{capital}</span></CountryDetails>
                    </CountryInfo>
                </Card>
    })}

    </CardsContainer>
}

export default Cards;