import React, {useState} from "react";
import styled from "styled-components";
import {Post} from "../../types/types-post.ts";
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/Button/Button.tsx";
import { toast } from "react-toastify";

const CreatePostContainer = styled.div`
    max-width: 600px;
    padding: 60px 10px;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
    height: 30px;
    
`;

const SubmitButton = styled.button`
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 80px;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
    padding: 40px 20px;
    border-radius: 4px;
    width: 90px;
    height: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;


interface CreatePostProps {
    addPost: (newPost: Omit<Post, 'id'>) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({addPost}) => {
    toast("Wow so easy!");
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        formData.append('content', content);

        console.log('Post enviado:', {
            title,
            author,
            description,
            content,
        });

        setTitle('');
        setAuthor('');
        setDescription('');
        setContent('');
        addPost({
            title,
            author,
            description,
            content,
        })
        toast("Wow so easy!");
        navigate('/admin')
    };

    return (
        <CreatePostContainer>
            <Title>Novo Post</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <TextArea
                    placeholder="Conteúdo"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <ButtonContainer>
                    <SubmitButton type="submit">Criar Postagem</SubmitButton>
                    <CancelButton type="button" onClick={() => navigate(-1)}>Cancelar</CancelButton>
                </ButtonContainer>
            </Form>
        </CreatePostContainer>
    );

};

export default CreatePost