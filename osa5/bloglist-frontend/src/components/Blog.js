import React from 'react'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, handleUpdate }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author}
      </div>
      <div>
        <Togglable buttonLabel={'view'}>
          <BlogDetails blog={blog} handleUpdate={handleUpdate} />
        </Togglable>
      </div>
    </div>
  )
}



export default Blog
