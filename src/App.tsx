import React, {useEffect, useState} from "react";
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import {AuthProvider} from "./Context/authContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import {Post} from "./types/types-post.ts";
import Header from "./components/Header/Header.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";
import Footer from "./components/Footer/footer.tsx";
//import { createProfessor, login } from "./services/api.tsx";
import { ProfessorProvider } from "./Context/professorContext.tsx";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

const App: React.FC = () => {
     return (
        
        <Router>
            <AuthProvider>
                <ProfessorProvider>
                    <div className="app-container">
                    <Header/>
                    <MainContent>
                        <AppRoutes />
                    </MainContent>
                    </div>
            </ProfessorProvider>
            </AuthProvider>
        </Router>

);
};

export default App
