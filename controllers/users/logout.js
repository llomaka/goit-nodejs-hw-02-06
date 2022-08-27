const { usersServices } = require('../../services')

const logout = async (req, res) => {
    const { _id } = req.user
    await usersServices.updateUserData(_id, { token: null })    
    res.status(204).json()
}

module.exports = logout