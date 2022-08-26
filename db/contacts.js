const { Contact } = require('../models')

const listContacts = async (owner) => {
  try {
    return await Contact.find(owner)
  } catch (error) {
    return error
  }
}

const getContactById = async (id) => {
  try {
    return await Contact.findById(id)
  } catch (error) {
    return error
  }
}

const removeContact = async (id) => {
  try {
    return await Contact.findByIdAndDelete(id)
  } catch (error) {
    return error
  }
}

const addContact = async (body) => {
  try {
    return await Contact.create(body)
  } catch (error) {
    return error
  }
}

const updateContact = async (id, body) => {
  try {
    return await Contact.findByIdAndUpdate(id, body, {new: true})
  } catch (error) {
    return error
  }
}

const updateStatusContact = async (id, body) => {
  try {
    return await Contact.findByIdAndUpdate(id, body, {new: true})
  } catch (error) {
    return error
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact }