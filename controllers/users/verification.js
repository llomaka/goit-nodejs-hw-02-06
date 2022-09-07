const { RequestError } = require('../../helpers')
const { usersServices } = require('../../services')

const verification = async (req, res) => {
    const { verificationToken } = req.params
    const user = await usersServices.getUserByVerTokenData(verificationToken)
    if (!user) {
        throw RequestError(404, 'User not found')
    }
    await usersServices.updateUserData(user._id, {
        verificationToken: null,
        verify: true
     })
    res.status(200).json({ message: 'Verification successful' })
}

module.exports = verification