const getAllContacts = require('./getAllContacts')
const getOneContactById = require('./getOneContactById')
const postOneContact = require('./postOneContact')
const deleteOneContactById = require('./deleteOneContactById')
const putOneContactById = require('./putOneContactById')

module.exports = {
    getAllContacts,
    getOneContactById,
    postOneContact,
    deleteOneContactById,
    putOneContactById
}