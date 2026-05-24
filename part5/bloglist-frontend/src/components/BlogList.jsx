import { Link } from 'react-router-dom'
import Notification from './Notification'

const BlogList = ({ blogs, user, notification }) => {
  return (
    <div>
      <h2>blogs</h2>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      {user && <p>{user.name} logged in</p>}
      <ul>
        {blogs.map((blog) => (
          <li className='blog-item' key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
