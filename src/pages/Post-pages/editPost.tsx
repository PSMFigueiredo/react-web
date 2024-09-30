import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Post} from "../../types/types-post.ts";

const EditPost: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [post,setPost] = useState<Post | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const response = await fetch(`/api/post/${id}`);
                const data = await response.json();
                setPost(data);
            }catch (error){
                console.error('Erro ao buscar o post:', error);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (post){
            try {
                await fetch(`/api/post/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(post),
                });
                navigate(`/posts/${post.id}`);
            } catch (error){
                console.error('Erro ao atualizar o post:', error);
            }
        }
    };

    if (!post) {
        return <p>Post nao encontrado.</p>
    }

    return (
        <div>
            <h1>Editar Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titulo:</label>
                    <input
                        type="text"
                        id="title"
                        value={post.title}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="author">Autor:</label>
                    <input
                        type="text"
                        id="author"
                        value={post.author}
                        onChange={(e) => setPost({ ...post, author: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Conteudo:</label>
                    <textarea
                        id="content"
                        value={post.content}
                        onChange={(e) => setPost({  ...post, content: e.target.value})}
                        required
                    />
                </div>
                <button type="submit">Salvar alterações</button>
            </form>
        </div>
    );
};
 export default EditPost
