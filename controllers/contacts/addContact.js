const { contactsServices } = require('../../services')

const addContact = async (req, res) => {
    const { _id: owner } = req.user
    res.status(201).json(await contactsServices.addContactData({ ...req.body, owner }))
}

module.exports = addContact