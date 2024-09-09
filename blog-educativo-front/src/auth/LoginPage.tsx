import React from "react";
import {useAuth} from "./authContent.tsx";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login();
        navigate('/admin');
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" required />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage