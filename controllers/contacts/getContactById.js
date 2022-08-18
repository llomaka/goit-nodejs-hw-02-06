const { contactsServices } = require('../../services')
const {RequestError} = require('../../helpers')

const getContactById = async (req, res) => {
    const { contactId } = req.params
    const contacts = await contactsServices.listContactsData()
    if (!contacts.find(contact => contact.id === contactId)) {
        throw RequestError(404, "Not found")
    } else {
        res.json(await contactsServices.listContactByIdData(contactId))
    }
}

module.exports = getContactById