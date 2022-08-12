const { listContactsData } = require('../../services/contacts')

const getAllContacts = async (req, res) => {
    res.json(await listContactsData())
}

module.exports = getAllContacts