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
    blogsInDb,
    usersInDb
}