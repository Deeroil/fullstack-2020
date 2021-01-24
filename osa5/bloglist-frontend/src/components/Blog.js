import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'
import DeleteButton from './DeleteButton'

const Blog = ({ blog, loggedUser, handleUpdate, handleRemoval }) => {
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
          {loggedUser.username === blog.user.username
            ? <DeleteButton blog={blog} handleRemoval={handleRemoval} />
            : null}
        </Togglable>
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
