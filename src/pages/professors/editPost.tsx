import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Post} from "../../types/types-post";
import styled from "styled-components";

const EditPostContainer = styled.div`
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

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 500px;
    display: flex;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
`;

const TextArea = styled.textarea`
    width: 500px;
    height: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    resize: vertical;
`;

const Button = styled.button`
+
    
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

interface EditPostProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const EditPost: React.FC<EditPostProps> = ({ posts, setPosts }) => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const postId = parseInt(id || '', 10);
        const foundPost = posts.find((p) => p.id === postId);
        if (foundPost) {
            setPost(foundPost);
        } else {
            console.error('Post não encontrado');
        }
    }, [id, posts]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (post) {
            // Atualiza o post na lista de posts
            const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
            localStorage.setItem(`posts`, JSON.stringify(updatedPosts))
            setPosts(updatedPosts);
            navigate(`/`);
        }
    };

    if (!post) {
        return <p>Post não encontrado.</p>;
    }

    return (
        <EditPostContainer>
            <Title>Editar Post</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="title">Título:</Label>
                    <Input
                        type="text"
                        id="title"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="author">Autor:</Label>
                    <Input
                        type="text"
                        id="author"
                        value={post.author}
                        onChange={(e) => setPost({ ...post, author: e.target.value })}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Descrição:</Label>
                    <Input
                        type="text"
                        id="description"
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="content">Conteúdo:</Label>
                    <TextArea
                        id="content"
                        value={post.content}
                        onChange={(e) => setPost({ ...post, content: e.target.value })}
                        required
                    />
                </FormGroup>
                <ButtonContainer>
                <Button type="submit">Salvar alterações</Button>
                    <CancelButton type="button" onClick={() => navigate(-1)}>Cancelar</CancelButton>
                </ButtonContainer>
                </Form>
        </EditPostContainer>
    );
};

export default EditPost;
