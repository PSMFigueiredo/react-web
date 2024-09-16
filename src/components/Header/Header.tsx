import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
    background-color: #191970;
    color: white;
    padding: 20px 40px;
    margin: 0 auto;
    position:absolute;
    top: 0px;
    width:100%;
`;

const HeaderTitle = styled.h1`
    text-align: center;
`;

const Nav = styled.nav`
    ul {
        list-style: none;
        display: flex;
        justify-content:center;
        margin: 0;
        padding: 0;
        
        li{
            margin-left: 20px;
        }
        
        a{
            color: white;
            text-decoration: none;
            font-size: 18px;
            transition: color 0.3s;
            
            &:hover {
                color: #61dafb;
            };
        };
    };
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <div>
                <div>
                    <HeaderTitle>Blog Escola</HeaderTitle>
                </div>
                <div>
                    <Nav>
                        <ul>
                            <li><a href="/">Pagina inicial</a></li>
                            <li><a href="/classes">Listar Classes</a></li>
                            <li><a href="/posts"> Listar Posts</a></li>
                            <li><a href="/professors"> Listar Professores</a></li>
                            <li><a href="/students">Listar estudantes</a></li>
                        </ul>
                    </Nav>
                </div>

            </div>

        </HeaderContainer>
    );
};

export default Header