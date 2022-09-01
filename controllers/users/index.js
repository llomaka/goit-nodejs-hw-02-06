const current = require('./current')
const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const subscription = require('./subscription')
const updateAvatar = require('./updateAvatar')
const verification = require('./verification')
const repeatVerify = require('./repeatVerify')

module.exports = {
    current,
    login,
    logout,
    register,
    subscription,
    updateAvatar,
    verification,
    repeatVerify
}