import React, {useState} from "react";
import styled from "styled-components";

const CreatePostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background-color: #f0f0f0;
    color: blue;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const ImagePreview = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
`;




const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file));
    }
};
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        console.log('Post enviado:', {
            title,
            author,
            description,
            content,
            image,
        });

        setTitle('');
        setAuthor('');
        setDescription('');
        setContent('');
        setImage(null);
        setImagePreview(null);
    };

    return(
        <CreatePostContainer>
            <h1>Criar um novo post</h1>
            <Form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Titulo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descricao"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                <Input
                    type="text"
                    placeholder="Autor"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    />
                    <TextArea
                        placeholder="Conteudo"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        required
                    />
                <Input type="file" accept="image/*" onChange={handleImageChange} />

                {imagePreview && <ImagePreview src={imagePreview} alt="Preview da imagem" />}
            <SubmitButton type="submit">Criar Post</SubmitButton>
            </Form>
        </CreatePostContainer>
    );
};

export default CreatePost