import Blog from './Blog'
import Notification from './Notification'

const BlogList = ({ blogs, user, notification, handleLikeFor, handleDeleteFor }) => {
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
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLikeFor(blog)}
          handleDelete={() => handleDeleteFor(blog)}
          allowDelete={user && user.username === blog.user?.username}
        />
      ))}
    </div>
  )
}

export default BlogList
