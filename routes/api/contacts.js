const express = require('express')

const router = express.Router()

const { schemaAddContact, schemaUpdateContact } = require('../../helpers/validation_schema')

const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  try {
    res.json(await listContacts())  
  } catch (error) {
    console.log(error.message)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await listContacts()
    if (!contacts.find(contact => contact.id === contactId)) {
      res.status(404).json({ "message": "Not found" })
    } else {
      res.json(await getContactById(contactId))
    }
  } catch (error) {
    console.log(error.message)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { value, error } = schemaAddContact.validate(req.body)
    if (error) {
      res.status(422).json({ "message": error.message })
    } else {
      res.status(201).json(await addContact(value))
    }
  } catch (error) {
    console.log(error.message)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await listContacts()
    if (!contacts.find(contact => contact.id === contactId)) {
      res.status(404).json({ "message": "Not found" })
    } else {
      await removeContact(contactId)
      res.json({ "message": "contact deleted" })
    }
  } catch (error) {
    console.log(error.message)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { value, error } = schemaUpdateContact.validate(req.body)
    const contacts = await listContacts()
    if (!contacts.find(contact => contact.id === contactId)) {
      res.status(404).json({ "message": "Not found" })
    } else if (Object.keys(req.body).length === 0 || error) {
      res.status(400).json({ "message": "missing fields" })
    } else {
      res.json(await updateContact(contactId, value))
    }
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
