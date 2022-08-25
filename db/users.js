const { User } = require('../models')

const addUser = async (body) => {
  try {
    return await User.create(body)
  } catch (error) {
    return error
  }
}

// const 

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({email})
    } catch (error) {
        return error
    }
}

const getAllUsers = async () => {
    try {
        return await User.find()
    } catch (error) {
        return error
    }
}

module.exports = { addUser, getUserByEmail, getAllUsers }