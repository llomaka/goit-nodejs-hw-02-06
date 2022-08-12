const { listContactsData, listContactByIdData } = require('../../services/contacts')
const {RequestError} = require('../../helpers')

const getOneContactById = async (req, res) => {
    const { contactId } = req.params
    const contacts = await listContactsData()
    if (!contacts.find(contact => contact.id === contactId)) {
        throw RequestError(404, "Not found")
    } else {
        res.json(await listContactByIdData(contactId))
    }
}

module.exports = getOneContactById