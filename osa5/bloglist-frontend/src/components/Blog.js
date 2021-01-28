import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedUser, handleUpdate, handleRemoval }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)

  const toggleVisibility = () => setDetailsVisibility(!detailsVisibility)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fdfd96',
    marginBottom: 5
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemoval(blog)
    }
  }

  //only if removal seems allowed
  const showDeleteButton = () => {
    return loggedUser.username === blog.user.username
      ? <button onClick={(e) => removeBlog(e)}>remove</button>
      : null
  }

  const addLike = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, 'likes': blog.likes + 1 }
    handleUpdate(updatedBlog)
  }

  const showDetails = () => {
    return (
      <div>
        <div>{blog.url}</div>
        <div>
          {'likes:' + blog.likes}
          <button onClick={(e) => addLike(e)}>like</button>
        </div>
        <div>{blog.user.user}</div>
        {showDeleteButton()}
      </div>
    )
  }

  return (
    <div style={blogStyle} className={'blogContent'}>
      <div>
        {blog.title}, {blog.author}
      </div>
      <div>
        <button onClick={toggleVisibility}> {detailsVisibility ? 'hide' : 'details'} </button>
        {detailsVisibility
          ? showDetails()
          : null
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  handleRemoval: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
}

export default Blog