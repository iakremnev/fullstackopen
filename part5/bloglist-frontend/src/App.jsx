import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const handleLogin = async (username, password) => {
        console.log(`Username: ${username}, password: ${password}`);
        const userData = await loginService.login(username, password);
        setUser(userData);
    };

    return (
        <div>
            <h2>blogs</h2>
            {!user && <LoginForm handleLogin={handleLogin} />}
            {user && (
                <>
                    <p>{user.name} logged in</p>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            )}
        </div>
    );
};

export default App;
