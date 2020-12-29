import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const get = async () => {
      const blogs = await blogService.getAll()
      setBlogs(sortBlogs(blogs))
    }
    get()
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const handleUsernameChange = (value) => {
    setUsername(value)
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
  }

  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
    return blogs
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    console.log('createBlog: ', blog)
    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      handleMessage(
        `Added ${blog.title || '[title missing]'} by ${blog.author || '[no author]'} successfully`
      )
    } catch (error) {
      handleMessage(
        `Adding blog ${blog.title || '[no title]'} by ${blog.author || '[no author]'} failed`
      )
      console.log('Error: ', error)
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
      const updatedBlogs = blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog)
      setBlogs(sortBlogs(updatedBlogs))

    } catch (error) {
      handleMessage(`Updating likes failed`)
      console.log('Error: ', error)
    }   
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      handleMessage('Logged in')
    } catch (error) {
      console.log('Error: ', error)
      handleMessage('Login failed: Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    handleMessage('Logged out')
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      </div>
    )
  }

  const loggedInView = () => {
    return (
      <div>
        <div>Logged in as {user.user}</div>
        <button onClick={handleLogout}>log out</button>
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <div key={blog.id}>
            <Blog blog={blog} handleUpdate={updateBlog} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Bloglist App</h2>
      <Notification message={message} />
      {(user === null) ? loginForm() : loggedInView()}
    </div>
  )
}

export default App