
import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {PostDetailProps} from "../../types/PostDetail.ts";
import styled from "styled-components";

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

const PostImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const CommentsSection = styled.div`
    margin-top: 40px;
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

const PostsSamples: Array<Post> = [
    {
        id: "d48e67b0-57c0-4282-a8e0-d64300d332c6",
        title: "Post 1",
        content: "Conteudo do Post 1",
        author: "655cac42-3465-47d1-b485-eab735584ce0",
        published: true,
    },
    {
        id: "d7e6ce17-ce8c-442a-9333-2b1bfe09b7b3",
        title: "Post 2",
        content: "Conteudo do Post 2",
        author: "9076051e-bbae-4daa-8d81-2f5b24ccf748",
        published: true,
    },
    {
        id: "e171e9c2-281e-444b-abb1-d19dcfedb1ab",
        title: "Post 3",
        content: "Conteudo do Post 3",
        author: "21fc9577-5444-4a0e-afd2-c66333c899a5",
        published: true,
    },
]

const PostDetail: React.FC<PostDetailProps> = () => {
    const [posts, setPosts] = useState(PostsSamples)
    const {id} = useParams<{ id: string }>();
    
    const post = posts.find(p => p.id === id);

    // const [comments, setComments] = useState<string[]>([]);
    // const [newComment, setNewComment] = useState<string>('');

    // const handleAddComment = () => {
    //     if (newComment.trim()){
    //         setComments([...comments, newComment]);
    //         setNewComment('');
    //     }
    // };

if (!post) {
    return <p>Post nao encontrado!</p>
}

return (
    <PostDetailContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostAuthor><strong>Autor</strong> {post.author}</PostAuthor>

        <PostContent>{post.content}</PostContent>

        <EditLink to={`/editPost.tsx${post.id}`}>Editar Post</EditLink>

        {/* <CommentsSection>
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
        </CommentsSection> */}
    </PostDetailContainer>
);
};

export default PostDetail;