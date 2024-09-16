import styled from "styled-components";
import React from "react";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
    padding: 20px;
`;

const Heading = styled.h1`
    font-size: 36px;
    color: #666;
    margin-bottom: 40px;
    text-align: center;
    max-width: 600px;
`;

const SubHeading = styled.p`
    font-size: 18px;
    color: #666;
    margin-bottom: 40px;
    text-align: center;
    max-width: 600px;
`;

const Image = styled.img`
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HomePage: React.FC = () => {
    return (
        <HomeContainer>
            <Heading>Bem-vindo ao Blog Escola</Heading>
            <SubHeading> Explore os posts dos seus professores, comente em um post que tenha gostado!</SubHeading>
        </HomeContainer>
    );
};

export default HomePage