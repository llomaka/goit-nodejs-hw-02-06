const { usersServices } = require('../../services')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { email, password, subscription } = req.body
    const user = await usersServices.getUserByEmailData(email)
    if (user) {
        throw new Conflict('Email in use')
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const { email: userEmail, subscription: userSubscription } = await usersServices.addUserData({ email, 'password': hashPassword, subscription })
    res.status(201).json({ 'user': { email: userEmail, subscription: userSubscription } })
}

module.exports = register