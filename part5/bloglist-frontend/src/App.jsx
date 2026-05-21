import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

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

    return (
        <div>
            <h2>blogs</h2>
            {!user && <LoginForm handleLogin={handleLogin} />}
            {user && (
                <>
                    <p>{user.name} logged in</p>
                    <button onClick={handleLogout}>log out</button>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            )}
        </div>
    );
};

export default App;
