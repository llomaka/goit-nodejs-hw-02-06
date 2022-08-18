const { contactsServices } = require('../../services')
const {RequestError} = require('../../helpers')

const updateFavorite = async (req, res) => {
    const { contactId } = req.params
    const contacts = await contactsServices.listContactsData()
    const foundContact = contacts.find(contact => contact.id === contactId)
    if (!foundContact) {
        throw RequestError(404, "Not found")
    } else if (Object.keys(req.body).length === 0 || !Object.hasOwn(req.body, 'favorite') || (typeof req.body.favorite !== 'boolean')) {
        throw RequestError(400, "missing field favorite")
    } else {
        await contactsServices.updateStatusContactByIdData(contactId, req.body)
        res.json(await contactsServices.listContactByIdData(contactId))
    }
}

module.exports = updateFavorite