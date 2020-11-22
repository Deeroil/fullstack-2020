const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Elämää fantasiaviidakossa',
        author: 'Reetu Kirjoittaja',
        url: 'vvv.fantasiawiiwakko.netti',
        likes: '1496'
    },
    {
        title: 'Kalasoppaa possuille',
        author: 'Aili Kananluoma',
        url: 'vvv.kalalampi.netti',
        likes: '506'

    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
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
    expect(response.body.length).toBe(initialBlogs.length)
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
    const blogObj = await api.post('/api/blogs').send(newBlog)        
    
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)
    
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain(
        'test blog'
    ) 
})

afterAll(() => {
    mongoose.connection.close()
})