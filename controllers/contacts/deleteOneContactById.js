const { listContactsData, removeContactById } = require('../../services/contacts')
const {RequestError} = require('../../helpers')

const deleteOneContactById = async (req, res) => {
    const { contactId } = req.params
    const contacts = await listContactsData()
    if (!contacts.find(contact => contact.id === contactId)) {
        throw RequestError(404, "Not found")
    } else {
        await removeContactById(contactId)
        res.json({ "message": "contact deleted" })
    }
}

module.exports = deleteOneContactById