const { usersServices } = require('../../services')
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env;

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await usersServices.getUserByEmailData(email)
    if (!user || !user.comparePassword(password)) {
        throw new Unauthorized('Email or password is wrong')
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
}

module.exports = login