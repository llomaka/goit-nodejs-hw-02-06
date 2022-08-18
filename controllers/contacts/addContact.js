const { contactsServices } = require('../../services')
const {RequestError} = require('../../helpers')

const addContact = async (req, res) => {
    if (req.body.length < 3 || !(Object.hasOwn(req.body, 'name') && Object.hasOwn(req.body, 'email') && Object.hasOwn(req.body, 'phone')) || !(typeof req.body.name === 'string' && typeof req.body.email === 'string' && typeof req.body.phone === 'string') || !((/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/).test(req.body.name) && (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(req.body.email.toLowerCase()) && (/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/).test(req.body.phone))) {
        throw RequestError(400, "Missing required name field")
    } else {
        res.status(201).json(await contactsServices.addContactData(req.body))
    }
}

module.exports = addContact