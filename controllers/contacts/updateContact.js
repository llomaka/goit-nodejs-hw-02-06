const { contactsServices } = require('../../services')
const {RequestError} = require('../../helpers')

const updateContact = async (req, res) => {
    const { contactId } = req.params
    const result = await contactsServices.updateContactByIdData(contactId, req.body)
    if (!result) {
        throw RequestError(404, "Not found")
    } else {
        res.json(result)
    }
}

module.exports = updateContact