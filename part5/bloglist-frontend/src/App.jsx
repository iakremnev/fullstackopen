import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavigationBar from './components/NavigationBar.jsx'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList.jsx'

import blogService from './services/blogs'
import loginService from './services/login'

import utils from './utils.js'

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

  /*
  const newBlogRef = useRef()
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
  */

  const handleDeleteFor = async (blog) => {
    if (confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      const deleteId = blog.id
      await blogService.deleteBlog(deleteId, user.token)
      setBlogs(blogs.filter((blog) => blog.id !== deleteId))
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
      .sort(utils.blogComparator)
    setBlogs(updatedBlogs)
  }

  return (
    <Router>
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
      </Routes>
    </Router>
  )
}

export default App
