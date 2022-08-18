const { contactsServices } = require('../../services')
const {RequestError} = require('../../helpers')

const removeContact = async (req, res) => {
    const { contactId } = req.params
    const contacts = await contactsServices.listContactsData()
    if (!contacts.find(contact => contact.id === contactId)) {
        throw RequestError(404, "Not found")
    } else {
        await contactsServices.removeContactById(contactId)
        res.json({ "message": "contact deleted" })
    }
}

module.exports = removeContact