const { addUser, getUserById, getUserByEmail, getAllUsers } = require('../db')

const addUserData = async (userObject) => {
    try {
        return await addUser(userObject)
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

const getAllUsersData = async () => {
    try {
        return await getAllUsers()
    } catch (error) {
        return error
    }
}

module.exports = { addUserData, getUserByEmailData, getUserByIdData, getAllUsersData }