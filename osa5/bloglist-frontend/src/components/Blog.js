import React from 'react'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

const Blog = ({ blog }) => (
  <div>
    <div>
      {blog.title}, {blog.author}
    </div>
    <div>
      <Togglable buttonLabel={'view'}>
        <BlogDetails blog={blog} />
      </Togglable>
    </div>
  </div>
)

export default Blog
