import React from "react";
import styled from "styled-components";
import HistoryRouter, {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/authContext.tsx";
import displayName = HistoryRouter.displayName;

const HeaderContainer = styled.header`
    background-color: #191970;
    color: white;
    margin: 0 auto;
    position:absolute;
    top: 0px;
    width:100%;
    justify-content: space-between;
    display: flex;
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
  padding-top: 50px;
    padding-right: 16px;
`;

const HeaderTitle = styled.h1`
    text-align: center;
`;

const Header: React.FC = () => {
    const {user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <HeaderContainer>
            <DivPaiHeader>
                <div>

                </div>
                <div>
                    <HeaderTitle>Blog Escola</HeaderTitle>
                </div>
                <DivBtnLoginHeader>
                    {user ? (
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