const { usersServices } = require('../../services')

const listUsers = async (_, res) => {
    res.status(201).json(await usersServices.getAllUsersData())
}

module.exports = listUsers