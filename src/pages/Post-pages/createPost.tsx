import React, {useState} from "react";
import styled from "styled-components";
import {createPostApi, getProfessorApi} from "../../services/api.tsx";
import {useProf} from "../../Context/professorContext.tsx";
import {useAuth} from "../../Context/authContext.tsx";

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

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const {professor} = useProf();
    const {auth} = useAuth();

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


        getProfessorApi(professor?.id ?? '', auth?.token ?? '').then(byId => {
            createPostApi({
                title,
                classId: "bcab7aef-6de7-4452-a379-a776c1048a3e",
                content: description,
                authorId: byId?.data?.professor?.id ?? '',
                published: true,
            }, auth?.token ?? '')
        })

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
                <SubmitButton type="submit">Criar Post</SubmitButton>
            </Form>
        </CreatePostContainer>
    );
};

export default CreatePost