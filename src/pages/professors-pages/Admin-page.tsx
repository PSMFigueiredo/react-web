import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../auth/authContext";
import { Post } from "../../types/types-post";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { samplePosts } from "../../testes/postExemplo"


const AdminContainer = styled.div`
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


const AdminPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            // Simula um atraso na resposta da "API"
            await new Promise((resolve) => setTimeout(resolve, 500));
            setPosts(samplePosts);
        };

        fetchPosts();
    }, []);

    const deletePost = async (id: number) => {
        const confirmDelete = window.confirm('Você tem certeza que quer excluir esse post?');
        if (confirmDelete) {
            try {
                // Simula a exclusão do post
                setPosts(posts.filter((post) => post.id !== id));
            } catch (error) {
                console.error('Erro ao excluir o post:', error);
            }
        }
    };

    return (
        <AdminContainer>
            <h1>Página Administrativa</h1>
            <Link to="/create">
                <Button>Criar novo Post</Button>
            </Link>
            <CardsContainer>
                {posts.map((post) => (
                    <Card key={post.id}>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.description}</CardDescription>
                        <CardAuthor>Autor: {post.author}</CardAuthor>
                        <ActionsContainer>
                            <Link to={`/edit/${post.id}`}>
                                <IconButton>
                                    <FaEdit />
                                </IconButton>
                            </Link>
                            <IconButton onClick={() => deletePost(post.id)}>
                                <FaTrash />
                            </IconButton>
                        </ActionsContainer>
                    </Card>
                ))}
            </CardsContainer>
        </AdminContainer>
    );
};

export default AdminPage;
