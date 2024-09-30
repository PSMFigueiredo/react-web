import React from "react";
import styled from "styled-components";


const FooterContainer = styled.footer`
background-color:#191970;
color: white;
text-align: center;
padding: 20px;
position:absolute;
bottom: 0px;
width:100%;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <p>Direitos autorais 2024</p>
        </FooterContainer>
    );
};

export default Footer