import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const LOGIN_LS_KEY = 'login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const newBlogRef = useRef()

  const blogComparator = (a, b) => b.likes - a.likes

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort(blogComparator)))
  }, [])

  useEffect(() => {
    const loginData = window.localStorage.getItem(LOGIN_LS_KEY)
    if (loginData) {
      setUser(JSON.parse(loginData))
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const loginData = await loginService.login(username, password)
      setUser(loginData)
      window.localStorage.setItem(
        LOGIN_LS_KEY,
        JSON.stringify(loginData),
      )
    } catch (error) {
      console.log(error)
      setNotification({
        status: 'error',
        message: 'Wrong username or password',
      })
      setTimeout(() => setNotification(null), 4000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(LOGIN_LS_KEY)
  }

  const handleCreateNewBlog = async (blog) => {
    try {
      const response = await blogService.createBlog(blog, user.token)
      setBlogs(blogs.concat(response))
      newBlogRef.current.toggleVisibility()
      setNotification({
        status: 'success',
        message: `New blog "${blog.title}" by ${blog.author} was added`,
      })
      setTimeout(() => setNotification(null), 4000)
    } catch (error) {
      setNotification({
        status: 'error',
        message: `Error adding new blog: ${error}`,
      })
      setTimeout(() => setNotification(null), 4000)
    }
  }

  const handleLikeFor = async (blog) => {
    const updatedBlog = await blogService.updateBlog(
      blog.id,
      {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      },
      user.token,
    )
    const updatedBlogs = blogs
      .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      .sort(blogComparator)
    setBlogs(updatedBlogs)
  }

  const handleDeleteFor = async (blog) => {
    if (confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      const deleteId = blog.id
      await blogService.deleteBlog(deleteId, user.token)
      setBlogs(blogs.filter((blog) => blog.id !== deleteId))
    }
  }

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
    )
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
      <Togglable buttonLabel="Add new blog" ref={newBlogRef}>
        <CreateBlogForm handleCreateNewBlog={handleCreateNewBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLikeFor(blog)}
          handleDelete={() => handleDeleteFor(blog)}
        />
      ))}
    </div>
  )
}

export default App
