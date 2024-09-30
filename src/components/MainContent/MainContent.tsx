import React from "react";
import styled from "styled-components";

const Main = styled.main`
    flex: 1;
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainContent: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <Main>
            {children}
        </Main>
    );
};

export default MainContent