const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Elämää fantasiaviidakossa',
        author: 'Reetu Kirjoittaja',
        url: 'vvv.fantasiawiiwakko.netti',
        likes: 1496
    },
    {
        title: 'Daily lives of orangutans',
        author: 'Aili Kananluoma',
        url: 'vvv.orangos.netti',
        likes: 506
    }
]

const createUser = async () => {
    const passwordHash = await bcrypt.hash('password123', 10)
    const user = new User({ username: 'root', user: 'user', passwordHash })
    await user.save()
}

const getUserId = async () => {
    const user = await User.findOne({ username: 'root' })
    return user.id
}

const createToken = async () => {
    const userForToken = {
        username: 'root',
        id: await getUserId()
    }
    return jwt.sign(userForToken, process.env.SECRET)
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    createUser,
    getUserId,
    createToken,
    blogsInDb,
    usersInDb
}