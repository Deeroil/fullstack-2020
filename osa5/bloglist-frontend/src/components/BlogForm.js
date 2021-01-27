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
          title <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
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