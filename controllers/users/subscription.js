const { usersServices } = require('../../services')
const { RequestError } = require('../../helpers')

const subscription = async (req, res) => {
    const { subscription } = req.body
    const { _id, subscription: currentSub } = req.user
    if (subscription === currentSub) {
        throw RequestError(409, 'Subscription type not changed');
    }
    const user = await usersServices.updateUserData(_id, { subscription })

    res.status(200).json({
        email: user.email,
        subscription: user.subscription
    })
}

module.exports = subscription