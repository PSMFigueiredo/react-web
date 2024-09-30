import React from "react";
import {PostListProps} from "../../types/postList.ts";
import styled from "styled-components";
import {Link} from "react-router-dom";

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

const PostList: React.FC<PostListProps> = ({ posts }) => {
    if (posts.length === 0) {
return <p>Sem posts encontrados.</p>;
    }
    return (
        <PostListContainer>
            <h1>Lista de Posts</h1>
            {posts.map((post) => (
                <PostItem key={post.id}>
                    <Link to={`/posts/:id${post.id}`}>
                    <PostTitle>{post.title}</PostTitle>
                    </Link>
                    <PostAuthor><strong>Autor:</strong> {post.author}</PostAuthor>
                    <PostDescription>{post.description}</PostDescription>
                </PostItem>
            ))}
        </PostListContainer>
    );
};

export default PostList;