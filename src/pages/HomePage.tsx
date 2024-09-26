import styled from "styled-components";
import React from "react";


const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:#6959CD;
    padding: 20px;
`;

const Heading = styled.h1`
    font-size: 36px;
    color: #fff;
    margin-bottom: 40px;
    text-align: center;
    max-width: 600px;
`;

const SubHeading = styled.p`
    font-size: 18px;
    color: #fff;
    margin-bottom: 40px;
    text-align: center;
    max-width: 600px;
`;

const HomePage: React.FC = () => {
    return (
        <HomeContainer>
            <Heading>Seja bem-vindo ao Blog da Escola!</Heading>
            <SubHeading>Aqui você pode explorar os posts dos seus professores, compartilhar suas opiniões e participar das discussões sobre os temas que mais te interessam.</SubHeading>
            <SubHeading>Não deixe de comentar nos seus favoritos!</SubHeading>
        </HomeContainer>
    );
};

export default HomePage