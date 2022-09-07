const { usersServices } = require('../../services')
const { RequestError } = require('../../helpers')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env;

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await usersServices.getUserByEmailData(email)
    if (!user || !(await user.comparePassword(password))) {
        throw RequestError(401, 'Email or password is wrong')
    }
    if (!user.verify) {
        throw RequestError(401, 'Email not verified')
    }
    const { id } = user
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
    await usersServices.updateUserData(id, { token })
    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
}

module.exports = login