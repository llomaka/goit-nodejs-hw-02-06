const { contactsServices } = require('../../services')

const addContact = async (req, res) => {
    res.status(201).json(await contactsServices.addContactData(req.body))
}

module.exports = addContact