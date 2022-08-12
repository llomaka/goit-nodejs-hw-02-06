const { listContactsData, updateContactByIdData } = require('../../services/contacts')
const {RequestError} = require('../../helpers')

const putOneContactById = async (req, res) => {
    const { contactId } = req.params
    const contacts = await listContactsData()
    if (!contacts.find(contact => contact.id === contactId)) {
        throw RequestError(404, "Not found")
    } else if (Object.keys(req.body).length === 0) {
        throw RequestError(400, "missing fields")
    } else {
        res.json(await updateContactByIdData(contactId, req.body))
    }
}

module.exports = putOneContactById