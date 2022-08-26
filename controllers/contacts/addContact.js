const { contactsServices } = require('../../services')

const addContact = async (req, res) => {
    const { _id } = req.user
    res.status(201).json(await contactsServices.addContactData({...req.body, owner: _id}))
}

module.exports = addContact