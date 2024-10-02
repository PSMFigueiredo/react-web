# Fiap PosTech -  Blog Escola

Front-end application for posting school activities on the school blog

## 🚀 Technologies

<ul>
<li><img align="center" alt="Rafa-Js" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"> Typescript</li>
<li><img align="center" alt="Rafa-Js" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"> React</li>
<li><img align="center" alt="Rafa-Js" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"> Vite JS</li>
</ul>

## 🔨 How to setup

1. Clone this repository
2. Install the dependeces `npm install`
3. Setup the back-end with <a href="https://www.github.com/lucaskrsi/blog-escola">Blog Escola - back-end</a> (optional)
4. Run the application with `npm run dev`

## 📑 API documentation

### Routes

#### Create Post
```
/post/create
```

#### Edit Post - Login with a Professor is required
```
/post/edit
```

#### List Posts
```
/post/list
```

#### Post Details
```
/post/:id
```

#### List Posts (admin) - Login with a Professor is required
```
/post/admin
```

## ➕ Aditional content

### Post Methods

#### Delete Post
```
api.tsx >> deletePostApi(id: string, token: string) => Promise<any>
```

### Class Methods

#### Create Class
```
api.tsx >> createClassApi(body: object, token: string) => Promise<any>
```
#### Update Class
```
api.tsx >> updateClassApi(id: string, body: object, token: string) => Promise<sany>
```
#### Get Class
```
api.tsx >> getClassApi(id: string, token: string) => Promise<any>
```

### Student Methods

#### Update Student
```
api.tsx >> updateStudentApi(id: string, body: object, token: string) => Promise<any>
```

### Professor Methods

#### Update Professor
```
api.tsx >> updateProfessorApi(id: string, body: object, token: string) => Promise<any>
```