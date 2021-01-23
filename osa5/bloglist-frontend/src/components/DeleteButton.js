import React from 'react'
import PropTypes from 'prop-types'

const DeleteButton = ({ blog, handleRemoval }) => {
    const removeBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
          handleRemoval(blog)
        }
      }
 
    return (
      <>
        <button onClick={(e) => removeBlog(e)}>remove</button>
      </>
    )
}

DeleteButton.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemoval: PropTypes.func.isRequired
}

export default DeleteButton