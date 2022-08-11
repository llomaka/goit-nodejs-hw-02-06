const { schemaAddContact, schemaUpdateContact } = require('../helpers/validation_schema')

const { listContactsData, listContactByIdData, removeContactById, addContactData, updateContactByIdData } = require('../services/contacts')

const getAllContacts = async (req, res, next) => {
    try {
        res.json(await listContactsData())
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const getOneContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const contacts = await listContactsData()
        if (!contacts.find(contact => contact.id === contactId)) {
            res.status(404).json({ "message": "Not found" })
        } else {
            res.json(await listContactByIdData(contactId))
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const postOneContact = async (req, res, next) => {
    try {
        const { value, error } = schemaAddContact.validate(req.body)
        if (error) {
            res.status(422).json({ "message": error.message })
        } else {
            res.status(201).json(await addContactData(value))
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const deleteOneContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const contacts = await listContactsData()
        if (!contacts.find(contact => contact.id === contactId)) {
            res.status(404).json({ "message": "Not found" })
        } else {
            await removeContactById(contactId)
            res.json({ "message": "contact deleted" })
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const putOneContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const { value, error } = schemaUpdateContact.validate(req.body)
        const contacts = await listContactsData()
        if (!contacts.find(contact => contact.id === contactId)) {
            res.status(404).json({ "message": "Not found" })
        } else if (Object.keys(req.body).length === 0 || error) {
            res.status(400).json({ "message": "missing fields" })
        } else {
            res.json(await updateContactByIdData(contactId, value))
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { getAllContacts, getOneContactById, postOneContact, deleteOneContactById, putOneContactById }