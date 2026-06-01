import { Link } from 'react-router-dom'
import Notification from './Notification'

const BlogList = ({ blogs, user, notification }) => {
  return (
    <div className='container'>
      <article>
        <h2 className='title'>blogs</h2>
        {notification && (
          <Notification
            status={notification.status}
            message={notification.message}
          />
        )}
        {user && <p>{user.name} logged in</p>}
        <div className='content'><ul>
          {blogs.map((blog) => (
            <li className='blog-item' key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </li>
          ))}
        </ul></div>
      </article>
    </div>
  )
}

export default BlogList
