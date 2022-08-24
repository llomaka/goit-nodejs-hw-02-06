const { Contacts } = require('../models')

const listContacts = async () => {
  try {
    return await Contacts.find({})
  } catch (error) {
    return error
  }
}

const getContactById = async (id) => {
  try {
    return await Contacts.findById(id)
  } catch (error) {
    return error
  }
}

const removeContact = async (id) => {
  try {
    return await Contacts.findByIdAndDelete(id)
  } catch (error) {
    return error
  }
}

const addContact = async (body) => {
  try {
    return await Contacts.create(body)
  } catch (error) {
    return error
  }
}

const updateContact = async (id, body) => {
  try {
    return await Contacts.findByIdAndUpdate(id, body, {new: true})
  } catch (error) {
    return error
  }
}

const updateStatusContact = async (id, body) => {
  try {
    return await Contacts.findByIdAndUpdate(id, body, {new: true})
  } catch (error) {
    return error
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact }