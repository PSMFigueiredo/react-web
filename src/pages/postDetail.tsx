import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {PostDetailProps} from "../types/PostDetail.ts";


const PostDetail: React.FC<PostDetailProps> = ({ posts }) => {
    const {id} = useParams<{ id: string }>();
    const post = posts.find(p => p.id === parseInt(id || '', 10));

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
    <div>
        <h1>{post.title}</h1>
        <p><strong>Author:</strong> {post.author}</p>
        <p>{post.content}</p>
        <Link to={`/edit/${post.id}`}>Editar Post</Link>

        <h3>Comments</h3>
        {comments.length > 0 ? (

            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        ) : (
            <p>Sem comentarios. Seja o primeiro a comentar!</p>
        )}

        <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentario"
            />
        <button onClick={handleAddComment}>Submit</button>
    </div>
    );
};

export default PostDetail;