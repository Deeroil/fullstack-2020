import React from 'react'

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

export default DeleteButton