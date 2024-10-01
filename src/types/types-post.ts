export interface Post{
    id: string;
    title: string;
    author: string;
    content: string
    class: Class
}

export interface Class{
    id: string;
    name: string;
}