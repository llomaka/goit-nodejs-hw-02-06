  const express = require('express')

const router = express.Router()

const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  res.json(await listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await listContacts()
  if (!contacts.find(contact => contact.id === contactId)) {
    res.status(404).send('Check data before next request')
  } else {
    res.json(await getContactById(contactId))
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400).send('Check data before next request')
  } else {
    res.status(201).json(await addContact(req.body))
  }  
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await listContacts()
  if (!contacts.find(contact => contact.id === contactId)) {
    res.status(404).send('Check data before next request')
  } else {
    res.json(await removeContact(contactId))
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const { name, email, phone } = req.body
  const contacts = await listContacts()
  if (!contacts.find(contact => contact.id === contactId)) {
    res.status(404).send('Check data before next request')
  } else if (!name || !email || !phone) {
    res.status(400).send('Check data before next request')
  } else {
    res.json(await updateContact(contactId, req.body))
  }  
})

module.exports = router
