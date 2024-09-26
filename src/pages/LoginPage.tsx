import React from "react";
import styled from "styled-components";
import Login from "../components/Login/Login.tsx";


const Container = styled.div`
    margin: 0 auto;
    width: 40%;
    display : flex;
    justify-content: center;
    align-items: center;
`;

const LoginPage: React.FC = () => {

    return (
        <Container>
            <Login/>
        </Container>
    );
};

export default LoginPage