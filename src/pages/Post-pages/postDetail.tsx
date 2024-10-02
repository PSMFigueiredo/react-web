import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {getPostApi, getProfessorApi, getProfessorsApi, getUserById, getUsersApi} from "../../services/api.tsx";
import {useAuth} from "../../Context/authContext.tsx";
import {Post} from "../../types/types-post.ts";
import {useProf} from "../../Context/professorContext.tsx";
import {User} from "../../types/User.ts";

const PostDetailContainer = styled.div`
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const PostTitle = styled.h1`
    font-size: 32px;
    color: #1a1a1a;
    margin-bottom: 20px;
`;

const PostAuthor = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
`;

const PostContent = styled.p`
    font-size: 18px;
    color: #333;
`;

const CommentsSection = styled.div`
    margin-top: 40px;
    color: #000
`;

const CommentTextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover{
        background-color: #0056b3;
    }
`;

const EditLink = styled(Link)`
    display: inline-block;
    margin-top: 20px;
    color: #007bff;
    text-decoration: none;
    
    &:hover{
        text-decoration: underline;
    }
`;

const PostDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [post,setPost] = useState<Post | null>(null);
    const {auth} = useAuth();
    const {professor} = useProf();
    const ehProfessor = professor?.role === `professor`;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPostApi(id ?? '', auth?.token ?? '');
                const data = await response.data;
                setPost(data);
            } catch (error){
                console.error('Erro ao buscar posts:, error');
            }
        };

        fetchPosts()
    }, []);

    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    const handleAddComment = () => {
        if (newComment.trim()){
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

if (!post) {
    return <p>Post nao encontrado!</p>
}

return (
    <PostDetailContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostAuthor><strong>Autor</strong> {post.author}</PostAuthor>

        <PostContent>{post.content}</PostContent>

        {ehProfessor && (
            <EditLink to={`/post/edit/${post.id}`}>Editar Post</EditLink>
        )}

        <CommentsSection>
            <h3>Comentarios</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            ) : (
                <p>Sem comentarios. Seja o primeiro a comentar!</p>
            )}
            <CommentTextArea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Adicione um comentario"
            />
            <SubmitButton onClick={handleAddComment}>Enviar</SubmitButton>
        </CommentsSection>
    </PostDetailContainer>
);
};

export default PostDetail;