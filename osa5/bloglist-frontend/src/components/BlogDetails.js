import React from 'react'

const BlogDetails = ({ blog }) => {
  const user = blog.user

  const detailStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    console.log('Not implemented yet!')
  }

  return (
    <div style={detailStyle}>
      <div>{blog.url}</div>
      <div>
        {'likes:' + blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>{user.user}</div>
    </div>
  )
}

export default BlogDetails