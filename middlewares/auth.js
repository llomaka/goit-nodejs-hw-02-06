const { RequestError } = require('../helpers')
const { usersServices } = require('../services')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env
const tokenRegex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/

const auth = async (req, _, next) => {
    const { authorization = '' } = req.headers
    const [bearer, token] = authorization.split(' ')
    try {
        if (bearer !== 'Bearer' || !tokenRegex.test(token)) {
            throw RequestError(401, 'Not authorized')
        }
        const { id } = jwt.verify(token, SECRET_KEY)
        const user = await usersServices.getUserByIdData(id)
        if (!user || user.token !== token) {
            throw RequestError(401, 'Not authorized')
        }
        req.user = user
        next()
    } catch (error) {
        if (error.message.toLowerCase() === 'invalid signature' || error.message.toLowerCase() === 'jwt expired' || error.message.toLowerCase() === 'jwt malformed' || error.message.toLowerCase() ===  'invalid token') {
            error.status = 401
        }
        next(error)
    }
}

module.exports = auth