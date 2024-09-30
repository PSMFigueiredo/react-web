import React from "react";
import styled from "styled-components";


const FooterContainer = styled.footer`
    background-color: #191970;
    color: white;
    margin: 0 auto;
    text-align: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    padding: 10px;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <p>Direitos autorais 2024</p>
        </FooterContainer>
    );
};

export default Footer