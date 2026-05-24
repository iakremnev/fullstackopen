import { useState, useEffect } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import NavigationBar from './components/NavigationBar.jsx'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList.jsx'
import Blog from './components/Blog.jsx'
import CreateBlogForm from './components/CreateBlogForm.jsx'

import blogService from './services/blogs'
import loginService from './services/login'

import utils from './utils.js'
import RequiresAuthentication from './components/RequiredAuthenication.jsx'

const LOGIN_LS_KEY = 'login'

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.toSorted(utils.blogComparator)))
  }, [])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const navigate = useNavigate()

  const handleCreateNewBlog = async (blog) => {
    try {
      const response = await blogService.createBlog(blog, user.token)
      setBlogs(blogs.concat(response))
      setNotification({
        status: 'success',
        message: `New blog "${blog.title}" by ${blog.author} was added`,
      })
      setTimeout(() => setNotification(null), 4000)
      navigate('/')
    } catch (error) {
      setNotification({
        status: 'error',
        message: `Error adding new blog: ${error}`,
      })
      setTimeout(() => setNotification(null), 4000)
    }
  }


  const handleDeleteFor = async (blog) => {
    if (confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      const deleteId = blog.id
      await blogService.deleteBlog(deleteId, user.token)
      setBlogs(blogs.filter((blog) => blog.id !== deleteId))
      navigate('/')
    }
  }

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
      navigate('/')
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
    navigate('/')
  }

  const handleLikeFor = async (blog) => {
    const updatedBlog = await blogService.updateBlog(
      blog.id,
      {
        user: blog.user?.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      },
      user.token,
    )
    const updatedBlogs = blogs
      .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      .sort(utils.blogComparator)
    setBlogs(updatedBlogs)
  }

  return (
    <div>
      <NavigationBar user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={
          <BlogList
            blogs={blogs}
            user={user}
            notification={notification}
            handleLikeFor={handleLikeFor}
            handleDeleteFor={handleDeleteFor}
          />
        }/>
        <Route path='/login' element={
          <LoginForm notification={notification} handleLogin={handleLogin}/>
        }/>
        <Route path='/blogs/:id' element={
          <Blog
            blog={blog}
            allowLike={Boolean(user)}
            allowDelete={user && user.username === blog?.user?.username}
            handleLike={async () => await handleLikeFor(blog)}
            handleDelete={async () => await handleDeleteFor(blog)}
          />
        }/>
        <Route path='/create' element={
          <RequiresAuthentication user={user}>
            <CreateBlogForm notification={notification} handleCreateNewBlog={handleCreateNewBlog}/>
          </RequiresAuthentication>
        }/>
      </Routes>
    </div>
  )
}

export default App
