import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Post} from "../../types/types-post.ts";
import {useProf} from "../../Context/professorContext.tsx";

const AdminContainer = styled.div`
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    
    th, td{
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    
    th {
        background-color: #f4f4f4;
    }
    
    td {
        vertical-align: middle;
    }
`;

const Button = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    margin-left: 10px;
    cursor: pointer;
    
    &:hover{
        background-color: #0056b3;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #dc3545;
    
    &:hover{
        background-color: #c82333;
    }
`;

const AdminPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const { professor } = useProf();
    const navigate = useNavigate();

    if (!professor || professor.role !== 'professor') {
        navigate('/login');
        return null;
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error){
                console.error('Erro ao buscar posts:, error');
            }
        };

        fetchPosts()
    }, []);

    const deletePost = async (id: string) => {
        const confirmDelete = window.confirm('Voce tem certeza que quer excluir esse post?')
        if (confirmDelete) {
            try {
                await fetch(`/api/posts/${id}`, {method: 'Delete'});
                setPosts(posts.filter(post => post.id !== id));
            } catch (error) {
                console.error('Erro ao excluir o post:', error);
            }
    }
    };

    return(
        <AdminContainer>
            <h1>Pagina Administrativa</h1>
            <Link to="/create">
                <Button>Criar novo Post</Button>
            </Link>
            <Table>
                <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Author</th>
                    <th>Acoes</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>
                            <Link to={`/edit/${post.id}`}>
                                <Button>Editar</Button>
                            </Link>
                            <DeleteButton onClick={() => deletePost(post.id)}>Deletar</DeleteButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </AdminContainer>
    );
};

export default AdminPage