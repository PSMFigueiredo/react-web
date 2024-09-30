import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Post} from "../types/types-post.ts";
import {Link} from "react-router-dom";


const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #6959CD;
    padding: 20px;
`;

const Heading = styled.h1`
    font-size: 36px;
    color: #fff;
    margin-bottom: 40px;
    text-align: center;
    max-width: 600px;
`;

const SearchInput = styled.input`
    padding: 10px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 10px;
`;


const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const Card = styled.div`
    background-color: #D4E5FD;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: calc(33.333% - 20px);
    padding: 20px;
    cursor: pointer;
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: calc(50% - 20px);
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

const CardTitle = styled.h2`
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #000;
`;

const CardDescription = styled.p`
    color: #666;
    margin-bottom: 15px;
`;

const CardAuthor = styled.p`
    font-weight: bold;
    margin-bottom: 15px;
    color: #000;
`;


interface ListPostProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const HomePage: React.FC<ListPostProps> = ({ posts, setPosts }) => {
    useEffect(() => {
        const fetchPosts = async () => {
            // Simula um atraso na resposta da "API"
            await new Promise((resolve) => setTimeout(resolve, 500));
            setPosts(JSON.parse(localStorage.getItem(`posts`) ?? `[]`));
        };

        fetchPosts();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    useEffect(() => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(results);
    }, [posts, searchTerm]);

    return (
        <HomeContainer>
            <Heading>Seja bem-vindo ao Blog da Escola!</Heading>
            <SearchInput
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CardsContainer>
                {filteredPosts.map((post) => (
                    <Card key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>{post.description}</CardDescription>
                            <CardAuthor>Autor: {post.author}</CardAuthor>
                        </Link>
                    </Card>
                ))}
            </CardsContainer>
        </HomeContainer>
    );
};

export default HomePage