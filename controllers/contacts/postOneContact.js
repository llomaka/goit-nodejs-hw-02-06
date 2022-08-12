const { addContactData } = require('../../services/contacts')

const postOneContact = async (req, res) => {
    res.status(201).json(await addContactData(req.body))
    //    if (error) {
    //         res.status(422).json({ "message": error.message })
    // }
}

module.exports = postOneContact