import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to Bloglist</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            id='username'
            onChange={({ target }) => handleUsernameChange(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            id='password'
            onChange={({ target }) => handlePasswordChange(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm