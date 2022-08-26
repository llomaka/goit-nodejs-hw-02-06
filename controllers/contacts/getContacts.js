const { contactsServices } = require('../../services')

const getContacts = async (req, res) => {
    const { _id } = req.user
    res.json(await contactsServices.listContactsData({ owner: _id }))
}

module.exports = getContacts