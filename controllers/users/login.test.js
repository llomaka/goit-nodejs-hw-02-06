const request = require('supertest')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const app = require('../../app')
const { DB_HOST, PORT = 3000 } = process.env
const login = require('./login')
const testUser = {"email": "llomaka80@gmail.com", "password": "M0ngoDB20"}

describe('Login controller test', () => {
    let connect, server
    beforeAll(async () => {
        await mongoose.connect(DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            server = app.listen(PORT)
        }).catch(()=>process.exit(1))
    })
    afterAll(() => {
        server.close((err) => {
            mongoose.connection.close()
        })
    })
    test('Login returns response that includes 200 status code', async () => {
        const response = await request(app).post("/api/users/login", login).send(testUser).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.user).toHaveProperty('email')
        expect(response.body.user).toHaveProperty('subscription')
    })
    test('Login returns token of String type', async () => {
        const response = await request(app).post("/api/users/login", login).send(testUser).set('Accept', 'application/json')
        expect(response.body).toHaveProperty('token')
        expect(typeof response.body.token).toBe('string')
    })
    test('Login returns object with email and subscription fields of String type', async () => {
        const response = await request(app).post("/api/users/login", login).send(testUser).set('Accept', 'application/json')
        expect(typeof response.body.user.email).toBe('string')
        expect(typeof response.body.user.subscription).toBe('string')
    })
    test('Login returns 400 when email or password is missing', async () => {
        const response = await request(app).post("/api/users/login", login).send({ "password": "pa$sw0rd" }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
    })
    test('Login returns 401 when email or password is wrong', async () => {
        const response = await request(app).post("/api/users/login", login).send({ "email": "llomaka80@gmail.com", "password": "pa$sw0rd" }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
})
