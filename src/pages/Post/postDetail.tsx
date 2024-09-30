
import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {PostDetailProps} from "../../types/PostDetail.ts";
import styled from "styled-components";
import {FaEdit} from "react-icons/fa";

const PostDetailContainer = styled.div`
    padding: 50px 80px;
    max-width: 800px;
    margin: 40px auto;
    background-color: #ffffff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
`;

const PostTitle = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #333333;
    text-align: center;
`;

const Divider = styled.hr`
    border-top: 1px solid #eee;
    margin: 20px 0;
`
const PostMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  color: #777777;
  font-size: 0.9rem;
`;

const PostAuthor = styled.span`
  font-weight: bold;
`;

const PostContent = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
    color: #444444;
    margin-bottom: 100px;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 1em;
    display: flex;
    align-items: center;
    
    &:hover {
        color: #0056b3;        
    }
`;

const EditIcon = styled(FaEdit)`
    margin-right: 5px;
`;

const CommentsSection = styled.div`
    margin-top: 40px;
`;

const CommentsTitle = styled.h3`
    margin-bottom: 20px;
    font-size: 1.5rem;
`;

const CommentList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-bottom: 30px;
`;

const CommentItem = styled.li`
    background-color: #f4f4f4;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 10px;
    color: #000
`;

const CommentTextArea = styled.textarea`
    width: 93%;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 6px;
    border: 1px solid #cccccc;
    resize: vertical;
    min-height: 100px;
    
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const SubmitButton = styled.button`
    padding: 12px 20px;
    align-self: flex-end;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    
    &:hover{
        background-color: #0056b3;
    }
`;


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
        <PostDetailContainer>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>
                <PostAuthor>{post.author}</PostAuthor>
            </PostMeta>

            <Divider>

            </Divider>

            <PostContent>{post.content}</PostContent>

            <Link to={`/edit/${post.id}`}>
                <EditButton>
                    <EditIcon />
                    Editar Post
                </EditButton>
            </Link>

            <CommentsSection>
                <CommentsTitle>Comentários</CommentsTitle>
                {comments.length > 0 ? (
                    <CommentList>
                        {comments.map((comment, index) => (
                            <CommentItem key={index}>{comment}</CommentItem>
                        ))}
                    </CommentList>
                ) : (
                    <p>Sem comentários. Seja o primeiro a comentar!</p>
                )}
                <CommentTextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Adicione um comentário"
                />
                <SubmitButton onClick={handleAddComment}>Enviar</SubmitButton>
            </CommentsSection>
        </PostDetailContainer>
    );


};

export default PostDetail;