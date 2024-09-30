import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Post} from "../types/types-post.ts";
import {FaEdit, FaTrash} from 'react-icons/fa';
import {useAuth} from "../auth/authContext.tsx";
import {getPosts} from "../services/api.tsx";

const HomeContainer = styled.div`
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
`;

const Button = styled.button`
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
        background-color: #0056b3;
    }
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

const ActionsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 1.2em;

    &:hover {
        color: #0056b3;
    }
`;

const Heading = styled.h1`
    font-size: 36px;
    color: #fff;
    align-self: center;
    margin: 0 auto 2rem auto;
    text-align: center;
    max-width: 600px;
`;

const SearchInput = styled.input`
    padding: 10px;
    background-color: #f9f9f9;
    margin: 0 auto 1rem auto;
    width: 100%;
    color: #1a1a1a;
    max-width: 600px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 10px;
`;

const ContainerSuperior = styled.div`
    display: grid;
`

const PrincipalPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const {user} = useAuth();
    const ehProfessor = user?.role === `professor`;
    useEffect(() => {
        const fetchPosts = async () => {
            const storedPosts = /*await getPosts();*/ JSON.parse(localStorage.getItem('posts') ?? '[]');

            setPosts(storedPosts);
        };

        fetchPosts();
    }, []);

    const deletePost = async (id: number) => {
        const confirmDelete = window.confirm('Você tem certeza que quer excluir esse post?');
        if (confirmDelete) {
            try {
                const updatedPosts = posts.filter((post) => post.id !== id);

                setPosts(updatedPosts);

                localStorage.setItem('posts', JSON.stringify(updatedPosts));

            } catch (error) {
                console.error('Erro ao excluir o post:', error);
            }
        }
    };

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
            <ContainerSuperior>
                {ehProfessor &&
                    (<h1>Página Administrativa</h1>) &&
                    (<Link to="/create">
                            <Button>Criar novo Post</Button>
                        </Link>
                    )}
                {!ehProfessor && (<Heading>Seja bem-vindo ao Blog da Escola!</Heading>)}
                <SearchInput
                    type="text"
                    placeholder="Buscar posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </ContainerSuperior>

            <CardsContainer>
                {filteredPosts.map((post) => (
                    <Card key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>{post.description}</CardDescription>
                            <CardAuthor>Autor: {post.author}</CardAuthor>
                            {ehProfessor && (
                                <ActionsContainer>
                                    <Link to={`/edit/${post.id}`}>
                                        <IconButton>
                                            <FaEdit/>
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={() => deletePost(post.id)}>
                                        <FaTrash/>
                                    </IconButton>
                                </ActionsContainer>
                            )}
                        </Link>
                    </Card>
                ))}
            </CardsContainer>
        </HomeContainer>
    );
};

export default PrincipalPage;
