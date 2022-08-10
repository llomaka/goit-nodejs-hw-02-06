const express = require('express')

const router = express.Router()

const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2})
    .required(),
    
  phone: Joi.string()
    .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/),

  email: Joi.string()
    .email({ minDomainSegments: 2}),
    
  phone: Joi.string()
    .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/),
})

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
    res.status(404).json({ "message": "Not found" })
  } else {
    res.json(await getContactById(contactId))
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  const result = schemaAddContact.validate({ name: name, email: email, phone: phone })
  if (!name || !email || !phone || result.error) {
    res.status(400).json({ "message": "missing required name field" })
  } else {
    res.status(201).json(await addContact(req.body))
  }  
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await listContacts()
  if (!contacts.find(contact => contact.id === contactId)) {
    res.status(404).json({"message": "Not found"})
  } else {
    await removeContact(contactId)
    res.json({"message": "contact deleted"})
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const result = schemaUpdateContact.validate({ name: req.body.name, email: req.body.email, phone: req.body.phone })
  const contacts = await listContacts()
  if (!contacts.find(contact => contact.id === contactId)) {
    res.status(404).json({"message": "Not found"})
  } else if (!req.body || result.error) {
    res.status(400).json({"message": "missing fields"})
  } else {
    res.json(await updateContact(contactId, req.body))
  }  
})

module.exports = router
