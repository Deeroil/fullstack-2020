import React from 'react'

const BlogDetails = ({ blog, handleUpdate }) => {
  const user = blog.user

  const detailStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, 'likes': blog.likes + 1 } 
    handleUpdate(updatedBlog)
  }

  return (
    <div style={detailStyle}>
      <div>{blog.url}</div>
      <div>
        {'likes:' + blog.likes}
        <button onClick={(e) => addLike(e)}>like</button>
      </div>
      <div>{user.user}</div>
    </div>
  )
}

export default BlogDetails