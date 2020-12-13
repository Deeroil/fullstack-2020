import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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

  useEffect(() => {
    const get = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
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
  const addBlog = async (blog) => {
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

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
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

  return (
    <div>
      <div>Logged in as {user.user}</div>
      <button onClick={handleLogout}>log out</button>
      <Notification message={message} />
      <BlogForm createBlog={addBlog} />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App