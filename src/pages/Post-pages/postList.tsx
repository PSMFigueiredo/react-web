import React, { useState } from "react";
import { PostListProps } from "../../types/postList.ts";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PostListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const PostItem = styled.li`
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 10px 0;
    width: 100%;
    max-width: 600px;
    list-style: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
`;

const PostAuthor = styled.p`
    font-size: 14px;
    color: #666;
`;
const PostDescription = styled.p`
    font-size: 14px;
    color: #444;
`;

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    published: boolean;
}

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


const PostList: React.FC = () => {
    const [posts, setPosts] = useState(PostsSamples)
    if (posts.length === 0) {
        return <p>Sem posts encontrados.</p>;
    }
    return (
        <PostListContainer>
            <h1>Lista de Posts</h1>
            {posts.map((post) => (
                <PostItem key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        <PostTitle>{post.title}</PostTitle>
                    </Link>
                    <PostAuthor><strong>Autor:</strong> {post.author}</PostAuthor>
                    <PostDescription>{post.content}</PostDescription>
                </PostItem>
            ))}
        </PostListContainer>
    );
};

export default PostList;