const getCurrent = require('./getCurrent')
const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const listUsers = require('./getAllUsers')

module.exports = {
    getCurrent,
    login,
    logout,
    register,
    listUsers
}