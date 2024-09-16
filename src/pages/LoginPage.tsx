import React, { useState } from "react";
import { useAuth } from "../auth/authContext.tsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    max-height: 400px;
    height: 100vh;
    background-color: #6959CD;
    width:100%;
`;

const LoginCard = styled.div`
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Title = styled.h1`
    color: #191970;
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #191970;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    margin-bottom: 20px;
`;

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            navigate('/admin')
        } else {
            setErrorMessage('Usuario Invalido');
        }
    };

    return (
        <LoginContainer>
            <LoginCard>
                <Title>Login</Title>
                <Form onSubmit={handleLogin}>
                    <Input
                        type="text"
                        id="username"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required />
                    <Input
                        type="password"
                        id="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <Button type="submit">Login</Button>
                </Form>
            </LoginCard>
        </LoginContainer>
    );
};

export default LoginPage