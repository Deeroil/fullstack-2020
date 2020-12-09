import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }, [])

  const handleUsernameChange = (value) => {
    setUsername(value)
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()    
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    } catch (error) {    
      console.log('Error: ', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <LoginForm 
        handleLogin={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
      />
    )
  }

  return (
    <div>
      <div>Logged in as {user.user}</div>
      <button onClick={handleLogout}>log out</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App