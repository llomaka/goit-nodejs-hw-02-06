const { addContactData } = require('../../services/contacts')
const {RequestError} = require('../../helpers')

const postOneContact = async (req, res) => {
    if (req.body.length < 3 || !(Object.hasOwn(req.body, 'name') && Object.hasOwn(req.body, 'email') && Object.hasOwn(req.body, 'phone'))) {
        throw RequestError(400, "Missing required name field")
    } else {
        res.status(201).json(await addContactData(req.body))
    }
}

module.exports = postOneContact