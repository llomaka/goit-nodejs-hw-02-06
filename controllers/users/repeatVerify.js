const { sendVerification, RequestError } = require('../../helpers')
const { usersServices } = require('../../services')

const repeatVerify = async (req, res) => {
    const { email } = req.body
    const user = await usersServices.getUserByEmailData(email)
    if (!user) {
        throw RequestError(401, 'Email is wrong')
    }
    if (user.verify) {
        throw RequestError(400, 'Verification has already been passed')
    }
    const link = `http://${req.headers.host}/api/users/verify/${user.verificationToken}`
    sendVerification(email, link)
    res.status(200).json({ message: 'Verification email sent' })
}

module.exports = repeatVerify