import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {editPostProps} from "../../types/EditPost.ts";


const EditPost: React.FC<editPostProps> = ({posts, updatePost}) => {
    const {id} = useParams<{id: string}>();
    const post = posts.find(p => p.id === parseInt(id || '', 10 ));
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setAuthor(post.author);
            setDescription(post.description);
            setContent(post.content);
        }
    }, [post]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (post) {
            const updatedPost = {
                ...post,
                title,
                author,
                description,
                content
            }
            updatePost(updatedPost);
            navigate(`/post/${post.id}`);
        }
    };

    if (!post){
        return<p> Post nao encontrado.</p>;
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="author">Autor:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Conteudo:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit"> Salvar alterações</button>
            </form>
        </div>
    );
};

export default EditPost