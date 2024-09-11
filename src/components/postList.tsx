import React from "react";
import {PostListProps} from "../types/postList.ts";



const PostList: React.FC<PostListProps> = ({ posts }) => {
    if (posts.length === 0) {
return <p>Sem posts encontrados.</p>;
    }
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p><strong>Author:</strong> {post.author}</p>
                    <p>{post.description}</p>
                </li>
            ))}
        </ul>
    );
};

export default PostList;