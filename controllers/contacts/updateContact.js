const { contactsServices } = require('../../services')
const {RequestError} = require('../../helpers')

const updateContact = async (req, res) => {
    const { contactId } = req.params
    const contacts = await contactsServices.listContactsData()
    if (!contacts.find(contact => contact.id === contactId)) {
        throw RequestError(404, "Not found")
    } else if (Object.keys(req.body).length === 0) {
        throw RequestError(400, "missing fields")
    } else {
        await contactsServices.updateContactByIdData(contactId, req.body)
        res.json(await contactsServices.listContactByIdData(contactId))
    }
}

module.exports = updateContact