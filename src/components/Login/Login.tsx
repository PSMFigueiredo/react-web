import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authContext";
import { Input } from "../Input/Input";
import { Form } from "../Form/Form";
import { Button } from "../Button/Button";
import {useProf}  from "../../Context/professorContext";


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
    const { auth, isAuthenticated, login } = useAuth();
    const {getProfessorByUser, professor} = useProf();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        login(email, password);
        if (auth){

            console.log(auth);
            getProfessorByUser(auth.refreshToken.userId, auth.token);
            
            console.log(professor);
        }

        if (isAuthenticated && professor) {
            navigate('/post/admin');
        } 

        if(isAuthenticated){
            navigate('/post');
        }
        
        if(!isAuthenticated){
            setErrorMessage('Usuario Invalido');
        }
    };

    return (
            <Form onSubmit={handleLogin}>
                <Title>Login</Title>
                <Input
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <Input
                    type="password"
                    id="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Button type="submit" onClick={handleLogin}>Login</Button>
                <Span>Não possui uma conta? <CraeteAccountButton href='/register'>Registrar-se</CraeteAccountButton></Span>
            </Form>
    );
};

export default Login