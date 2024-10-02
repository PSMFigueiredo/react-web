import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Post} from "../../types/types-post.ts";
import {getPostApi, updatePostApi} from "../../services/api.tsx";
import {useAuth} from "../../Context/authContext.tsx";
import styled from "styled-components";

const CreatePostContainer = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Input = styled.input`
    padding: 12px 15px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;

    &:focus {
        border-color: #007bff;
        outline: none
    }
`;

const TextArea = styled.textarea`
    padding: 12px 15px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    resize: vertical;
    height: 150px;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const EditPost: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [post,setPost] = useState<Post | null>(null);
    const navigate = useNavigate();
    const {auth} = useAuth();

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const response = await getPostApi(`${id}`, auth?.token ?? '');
                const data = await response.data;
                setPost(data);
            }catch (error){
                console.error('Erro ao buscar o post:', error);
            }
        };
        fetchPost();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (post){
            try {
                await updatePostApi(id ?? '', post, auth?.token ?? '')
                navigate(`/post/list`);
            } catch (error){
                console.error('Erro ao atualizar o post:', error);
            }
        }
    };

    if (!post) {
        return <p>Post nao encontrado.</p>
    }

    return (
        <CreatePostContainer>
            <Title>Editar Post</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Título"
                    value={post.title}
                    onChange={(e) => setPost({...post, title: e.target.value})}
                    required
                />
                <Input
                    type="text"
                    placeholder="Descrição"
                    value={post.content}
                    onChange={(e) => setPost({  ...post, content: e.target.value})}
                    required
                />
                <Input
                    type="text"
                    placeholder="Autor"
                    value={post.author}
                    onChange={(e) => setPost({ ...post, author: e.target.value})}
                    required
                />
                <TextArea
                    placeholder="Conteúdo"
                    value={post.content}
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                    required
                />
                <SubmitButton type="submit">Salvar alterações</SubmitButton>
            </Form>
        </CreatePostContainer>
    );
};
 export default EditPost
