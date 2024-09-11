import React from "react";
import {Link} from "react-router-dom";
import {AdminPageProps} from "../types/AdminPage.ts";


const AdminPage: React.FC<AdminPageProps> = ({posts, deletePost}) => {

    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm('Voce tem certeza que quer excluir esse post?')
        if (confirmDelete) {
            deletePost(id);
        };
    };

    return(
        <div>
            <h1>Admin Page</h1>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>
                            <Link to={`/edit/${post.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(post.id)}>Deletar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage