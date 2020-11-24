const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

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

test('POST req creates new blog', async ()  => {
    const newBlog = {
        title: 'test blog',
        author: 'test author',
        url: 'www.testytest.com',
        likes: '3'
    }
    await api.post('/api/blogs').send(newBlog)        
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'test blog'
    ) 
})

test('title and url missing returns 400 Bad Request', async () => {
    const newBlog = {
        author: 'author',
        likes: '100'
    }
    
    const result = await api.post('/api/blogs').send(newBlog)
    expect(result.status).toBe(400)
})

test('likes have default value of 0', async () => {
    const newBlog = new Blog({
        title: 'test blog',
        author: 'test author',
        url: 'www.testytest.com'
    })
    expect(newBlog.likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close()
})