const { listContactsData, listContactByIdData, updateStatusContactByIdData } = require('../../services/contacts')
const {RequestError} = require('../../helpers')

const patchFavoriteContactById = async (req, res) => {
    const { contactId } = req.params
    const contacts = await listContactsData()
    if (!contacts.find(contact => contact.id === contactId)) {
        throw RequestError(404, "Not found")
    } else if (Object.keys(req.body).length === 0 || !Object.hasOwn(req.body, 'favorite') || (typeof req.body.favorite !== 'boolean')) {
        throw RequestError(400, "missing field favorite")
    } else {
        await updateStatusContactByIdData(contactId, req.body)
        res.json(await listContactByIdData(contactId))
    }
}

module.exports = patchFavoriteContactById