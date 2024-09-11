import React, {useState} from "react";
import {useAuth} from "../auth/authContext.tsx";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);
        if (success){
            navigate('/admin')
        } else {
            setErrorMessage('Usuario Invalido');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {errorMessage && <p style={{ color: 'red'}}>{errorMessage}</p> }
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage