const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('with initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await helper.createUser()
    })

    test('api returns only the initial user', async () => {
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(1)
        expect(response.body[0].username).toBe('root')
    })

    test('user with same name isn\'t added, status code and error message are correct', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            user: 'Someone Else',
            password: 'pw123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart).toHaveLength(usersAtEnd.length)
    })
})

describe('creating a new valid user', () => {
    test('with valid username and password returns 201 created', async () => {
        await api
            .post('/api/users/')
            .send({ username: 'Mattikainen', password: 'blabla100' })
            .expect(201)
    })
})

describe('creating an user with invalid properties', () => {
    test('empty body returns 400 bad request', async () => {
        await api
            .post('/api/users/')
            .send({})
            .expect(400)
    })

    test('throws validation error if username is too short', async () => {
        const response = await api
            .post('/api/users/')
            .send({ username: 'Ma', password: 'blabla100' })
        expect(response.body.error).toContain('`username` (`Ma`) is shorter')
    })
})

afterAll(() => {
    mongoose.connection.close()
})