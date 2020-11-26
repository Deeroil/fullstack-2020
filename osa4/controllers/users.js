const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)

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
    response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    const body = request.body

    for (const key in body) {
        user[key] = body[key]
    }

    const updatedUser = User.findByIdAndUpdate(request.params.id, user, {new: true})
    response.json(updatedUser)
})

module.exports = usersRouter