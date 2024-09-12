import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {AdminPageProps} from "../../types/AdminPage.ts";
import styled from "styled-components";
import {useAuth} from "../../auth/authContext.tsx";

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

const AdminPage: React.FC<AdminPageProps> = ({posts, deletePost}) => {
    const {user} = useAuth()
    const navigate = useNavigate();

    if (!user || user.role !== 'professor') {
        navigate('/login');
        return null;
    }
    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm('Voce tem certeza que quer excluir esse post?')
        if (confirmDelete) {
            deletePost(id);
        }
    };

    return(
        <AdminContainer>
            <h1>Pagina Administrativa</h1>
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
                            <DeleteButton onClick={() => handleDelete(post.id)}>Deletar</DeleteButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </AdminContainer>
    );
};

export default AdminPage