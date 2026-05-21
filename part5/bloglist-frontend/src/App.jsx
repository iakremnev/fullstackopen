import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlogForm from "./components/CreateBlogForm";

const LOGIN_LS_KEY = "login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

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
        try {
            const loginData = await loginService.login(username, password);
            setUser(loginData);
            window.localStorage.setItem(
                LOGIN_LS_KEY,
                JSON.stringify(loginData),
            );
        } catch (error) {
            setNotification({
                status: "error",
                message: "Wrong username or password",
            });
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem(LOGIN_LS_KEY);
    };

    const handleCreateNewBlog = async (blog) => {
        try {
            const response = await blogService.createBlog(blog, user.token);
            setBlogs(blogs.concat(response))
            setNotification({
                status: "success",
                message: `New blog "${blog.title}" by ${blog.author} was added`,
            });
            setTimeout(() => setNotification(null), 4000);
        } catch (error) {
            setNotification({
                status: "error",
                message: `Error adding new blog: ${error}`,
            });
            setTimeout(() => setNotification(null), 4000);
        }
    };

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                {notification && (
                    <Notification
                        status={notification.status}
                        message={notification.message}
                    />
                )}
                <LoginForm handleLogin={handleLogin} />
            </div>
        );
    }
    return (
        <div>
            <h2>blogs</h2>
            {notification && (
                <Notification
                    status={notification.status}
                    message={notification.message}
                />
            )}
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
