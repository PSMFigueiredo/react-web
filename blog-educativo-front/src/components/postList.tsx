import React from "react";
import {Link} from "react-router-dom";
import {Post} from "../types/types-post.ts";


interface PostListProps{
    posts: Post[]
}

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
                    <Link to={`/posts/${post.id}`}>Read more</Link>
                </li>
            ))}
        </ul>
    );
};

export default PostList;