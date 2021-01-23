import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blog = {
    'title': title,
    'author': author,
    'url': url
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create a New Blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title <input type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author <input type='text' value={author} name='author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url <input type='text' value={url} name='url' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>send</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm