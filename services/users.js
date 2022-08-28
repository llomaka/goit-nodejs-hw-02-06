const { addUser, getUserById, getUserByEmail, updateUser } = require('../db')

const addUserData = async (userObject) => {
    try {
        return await addUser(userObject)
    } catch (error) {
        return error
    }
}

const updateUserData = async (userId, userObject) => {
    try {
        return await updateUser(userId, userObject)
    } catch (error) {
        return error
    }
}

const getUserByIdData = async (userId) => {
    try {
        return await getUserById(userId)
    } catch (error) {
        return error
    }
}

const getUserByEmailData = async (email) => {
    try {
        return await getUserByEmail(email)
    } catch (error) {
        return error
    }
}

module.exports = { addUserData, getUserByEmailData, getUserByIdData, updateUserData }