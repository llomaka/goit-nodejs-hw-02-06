/* eslint-disable no-useless-catch */
const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const contactsPath = path.join(__dirname, 'contacts.json')

// reading all contacts
const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(contactsList)
  } catch (error) {
    console.error('Error reading contacts')
    throw error
  }
}

// read contact by id
const getContactById = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf8')
    const contactsArray = JSON.parse(contactsList)
    const contact = contactsArray.find(contact => contact.id === contactId)
    return contact
  } catch (error) {
    console.error(`Error reading contact ${contactId} information`)
    throw error
  }
}

// delete contact by id
const removeContact = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf8')
    const contactsArray = JSON.parse(contactsList)
    const contact = contactsArray.find(contact => contact.id === contactId)
    if (!contact) return
    const newContactsArray = contactsArray.filter(contact => contact.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newContactsArray, null, 2))
  } catch (error) {
    console.error(`Error removing contact ${contactId}`)
    throw error
  }
}

// add contact
const addContact = async (body) => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf8')
    const contactsArray = JSON.parse(contactsList)
    const contact = {
      id: crypto.randomUUID(),
      ...body
    }
    contactsArray.push(contact)
    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2))
    return contact
  } catch (error) {
    console.error(`Error adding contact ${body.name}`)
    throw error
  }
}

// update contact by id
const updateContact = async (contactId, body) => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf8')
    const contactsArray = JSON.parse(contactsList)
    const contact = contactsArray.find(contact => contact.id === contactId)
    const contactIndex = contactsArray.findIndex(contact => contact.id === contactId)
    const updatedContact = {
      ...contact,
      ...body
    }
    contactsArray[contactIndex] = updatedContact
    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2))
    return updatedContact
  } catch (error) {
    console.error(`Error updating contact ${contactId}`)
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
