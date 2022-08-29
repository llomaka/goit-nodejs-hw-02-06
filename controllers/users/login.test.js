const express = require('express')
const request = require('supertest')
const login = require('./login')
const controllerWrapper = require('../../helpers')

const app = express()

describe('Login controller test', () => {
    beforeAll(() => app.listen(3003))
    afterAll(() => app.close())
    test('Login returns response that includes 200 status code, token and object with email and subscription fields of String type', async () => {
        const response = await request(app).post("/api/users/login", controllerWrapper(login)).send({ "email": "new@mail.com", "password": "pa$sw0rd" })
        expect(response.status).toBe(200)
        expect(response.body.user).objectContaining({
            email: expect.toBe('string'),
            subscription: expect.toBe('string'),
        })
        expect(typeof response.body.token).toBe('string')
    })
})
