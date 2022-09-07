const gravatar = require('gravatar');
const { usersServices } = require('../../services')
const { RequestError, sendVerification } = require('../../helpers')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const register = async (req, res) => {
    const { email, password, subscription } = req.body
    const user = await usersServices.getUserByEmailData(email)
    if (user) {
        throw RequestError(409, 'Email in use')
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email, { protocol: 'https' })

    const { email: userEmail, subscription: userSubscription, verificationToken } = await usersServices.addUserData({
        email,
        password: hashPassword,
        subscription,
        avatarURL,
        verificationToken: crypto.randomUUID()
    })
    const link = `http://${req.headers.host}/api/users/verify/${verificationToken}`
    sendVerification(email, link)
    res.status(201).json({ 'user': { email: userEmail, subscription: userSubscription } })
}

module.exports = register