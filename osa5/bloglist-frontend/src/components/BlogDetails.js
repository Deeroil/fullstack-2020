import React from 'react'

const BlogDetails = ({ blog, handleUpdate }) => {
  const user = blog.user

  const detailStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderRadius: 5,
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