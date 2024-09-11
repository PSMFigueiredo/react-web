import React from "react";
import {PostListProps} from "../types/postList.ts";
import styled from "styled-components";

const PostListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const PostList: React.FC<PostListProps> = ({ posts }) => {
    if (posts.length === 0) {
return <p>Sem posts encontrados.</p>;
    }
    return (
        <PostListContainer>
            <h1>Lista de Posts</h1>
            {posts.map(post => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p><strong>Author:</strong> {post.author}</p>
                    <p>{post.description}</p>
                </li>
            ))}
        </PostListContainer>
    );
};

export default PostList;