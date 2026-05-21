import { useState } from "react";

const Blog = ({ blog, handleLike }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (!expanded) {
      return <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>Show</button>
      </div>
    }
    return (
        <div style={blogStyle}>
          <div>
          {blog.title} {blog.author}
          <button onClick={toggleExpanded}>Hide</button>
          </div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user?.name}</div>
        </div>
    );
};

export default Blog;
