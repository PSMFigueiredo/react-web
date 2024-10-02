import React from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../Context/authContext";


const HeaderContainer = styled.header`
    background-color: #191970;
    color: white;
    position:absolute;
    top: 0;
    width:100%;
    height: 100px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const DivPaiHeader = styled.div`
    width: 100%;
  display: flex;
    justify-content: space-between;
`;

const DivBtnLoginHeader = styled.div`
  padding-top: 20px;
    padding-right: 16px;
`;

const HeaderTitle = styled.h1`
    text-align: center;
    margin-left: 1rem;
    margin-top: 10px;
`;

const Header: React.FC = () => {
    const {isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <HeaderContainer>
            <DivPaiHeader>
                <div>
                    <HeaderTitle>Blog Escola</HeaderTitle>
                </div>
                <DivBtnLoginHeader>
                    {isAuthenticated ? (
                        <Button onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    )}
                </DivBtnLoginHeader>
            </DivPaiHeader>

        </HeaderContainer>
    );
};

export default Header