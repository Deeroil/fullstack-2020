const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    await helper.createUser()

    const userId = await helper.getUserId()

    for (let blog of helper.initialBlogs) {
        blog.user = userId

        let blogObj = new Blog(blog)
        await blogObj.save()
    }
})

describe('when there are initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('api returns right amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('blogs have id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
    test('blogs have user', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.user).toBeDefined()
        })
    })
})

describe('addition of a new blog', () => {
    test('POST req with valid data creates new blog', async () => {
        const userId = await helper.getUserId()
        const token = await helper.createToken()

        const newBlog = {
            title: 'test blog',
            author: 'test author',
            url: 'www.testytest.com',
            likes: 3,
            user: userId
        }

        await api.post('/api/blogs').set({ 'Authorization': 'bearer ' + token }).send(newBlog)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            'test blog'
        )
    })

    test('title and url missing returns 400 Bad Request', async () => {
        const userId = await helper.getUserId()
        const token = await helper.createToken()

        const newBlog = {
            author: 'author',
            likes: 100,
            user: userId
        }

        const result = await api.post('/api/blogs').set({ 'Authorization': 'bearer ' + token }).send(newBlog)
        expect(result.status).toBe(400)
    })

    test('token missing returns 401 unauthorized', async () => {
        const newBlog = {
            title: 'test blog',
            author: 'test author',
            url: 'www.testytest.com',
            likes: 3
        }
        const result = await api.post('/api/blogs').send(newBlog)
        expect(result.status).toBe(401)
    })

    test('likes have default value of 0', async () => {
        const newBlog = new Blog({
            title: 'test blog',
            author: 'test author',
            url: 'www.testytest.com'
        })
        expect(newBlog.likes).toBe(0)
    })
})

describe('deletion of a blog', () => {
    test('status code 204 after successful deletion using a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToRemove = blogsAtStart[0]
        const token = await helper.createToken()

        const response = await api.delete('/api/blogs/' + blogToRemove.id).set({ 'Authorization': 'bearer ' + token })
        expect(response.status).toBe(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})