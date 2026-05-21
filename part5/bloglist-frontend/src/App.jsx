import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlogForm from "./components/CreateBlogForm";

const LOGIN_LS_KEY = "login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loginData = window.localStorage.getItem(LOGIN_LS_KEY);
        if (loginData) {
            setUser(JSON.parse(loginData));
        }
    }, []);

    const handleLogin = async (username, password) => {
        const loginData = await loginService.login(username, password);
        setUser(loginData);
        window.localStorage.setItem(LOGIN_LS_KEY, JSON.stringify(loginData));
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem(LOGIN_LS_KEY);
    };

    const handleCreateNewBlog = async (blog) => {
      const response = await blogService.createBlog(blog, user.token)
      console.log(response)
    }

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                <LoginForm handleLogin={handleLogin} />
            </div>
        );
    }
    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>log out</button>
            <CreateBlogForm handleCreateNewBlog={handleCreateNewBlog} />
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
