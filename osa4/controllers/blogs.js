const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (blog.title && blog.url) {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } else {
        response.status(400).json({ error: 'blog title and url missing' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const newLikes = {
        likes: request.body.likes,
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newLikes, {new: true})
    response.json(updatedBlog)
})

module.exports = blogsRouter