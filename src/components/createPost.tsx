import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {CreatePostProps} from "../types/CreatePost.ts";


const CreatePost: React.FC<CreatePostProps> = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPost({title, description, content, author});
        navigate('/');

    };

    return(
        <div>
            <h1>Criar um novo post</h1>
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
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
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
                <button type="submit">Criar Post</button>
            </form>
        </div>
    );
};

export default CreatePost