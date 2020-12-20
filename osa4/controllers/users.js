const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    //don't show user's id in the blog
    const users = await User.find({})
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

    if (user) {
        response.json(user)
    } else {
        response.status(404).end()
    }
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.password || body.password.length < 3) {
        return response.status(400).json({ error: 'password missing or has less than 3 characters' })
    }

    const saltrounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltrounds)

    const user = new User({
        username: body.username,
        user: body.user,
        passwordHash
    })

    const savedUser = await user.save()
    await savedUser
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
        .execPopulate()
    response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
    const updatedUser = await User
        .findByIdAndUpdate(request.params.id, request.body, { new: true })
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(updatedUser)
})

module.exports = usersRouter