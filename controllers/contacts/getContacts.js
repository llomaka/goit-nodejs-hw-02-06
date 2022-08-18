const { contactsServices } = require('../../services')

const getContacts = async (req, res) => {
    res.json(await contactsServices.listContactsData())
}

module.exports = getContacts