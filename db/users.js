const { User } = require('../models')

const addUser = async (body) => {
  try {
    return await User.create(body)
  } catch (error) {
    return error
  }
}

const getUserById = async (id) => {
  try {
    return await User.findById(id)
  } catch (error) {
    return error
  }
}

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({email})
    } catch (error) {
        return error
    }
}

const updateUser = async (id, userObject) => {
  try {
    return await User.findByIdAndUpdate(id, userObject, {new: true})
  } catch (error) {
    return error
  }
}

const getUserByVerToken = async (verificationToken) => {
  try {
    return await User.findOne({verificationToken})
  } catch (error) {
    return error
  }
}

module.exports = { addUser, getUserByEmail, getUserById, updateUser, getUserByVerToken }