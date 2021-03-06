const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, user: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
        .populate('user', { username: 1, user: 1 })

    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    if (!blog.title && !blog.url) {
        return response.status(400).json({ error: 'blog title and url missing' })
    }
    const savedBlog = await blog.save()
    await savedBlog
        .populate('user', { username: 1, user: 1 })
        .execPopulate()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)

    if (!(token && decodedToken.id === blog.user.toString())) {
        return response.status(401).json({ error: 'token invalid, missing or wrong user' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, request.body, { new: true })
        .populate('user', { username: 1, user: 1 })
    response.json(updatedBlog)
})

module.exports = blogsRouter