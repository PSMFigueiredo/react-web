import styled from "styled-components";
import React from "react";
import Login from "../components/Login/Login";

const HomeMainContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color:#6959CD;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
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
        <HomeMainContent>
            <Container>
                <Heading>Seja bem-vindo ao Blog da Escola!</Heading>
                <SubHeading>Aqui você pode explorar os posts dos seus professores, compartilhar suas opiniões e participar das discussões sobre os temas que mais te interessam.</SubHeading>
                <SubHeading>Não deixe de comentar nos seus favoritos!</SubHeading>
            </Container>
            <Container>
                <Login/>
            </Container>
        </HomeMainContent>
    );
};

export default HomePage