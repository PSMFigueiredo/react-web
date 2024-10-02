import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useAuth} from "../../Context/authContext";
import {Input} from "../Input/Input";
import {Form} from "../Form/Form";
import {Button} from "../Button/Button";

const Title = styled.h1`
color: #191970;
text-align: center;
margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
    background-color:#e8a2a2;
    color: #751010;
    text-align: center;
    border-radius: 15px;
    margin-bottom: 20px;
    width: 100%;
    padding: 10px;
    height: fit-content;
`;

const CraeteAccountButton = styled.a`
    color: #6959CD;
`;

const Span = styled.span`
    margin-top: 15px;
    color: #333;
`;

const Login: React.FC = () => {
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
            <Form onSubmit={handleLogin}>
                <Title>Registar-se</Title>
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
                <Span>Não possui uma conta? <CraeteAccountButton href='/register'>Registrar-se</CraeteAccountButton></Span>
            </Form>
    );
};

export default Login