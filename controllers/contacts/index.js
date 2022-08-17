const getAllContacts = require('./getAllContacts')
const getOneContactById = require('./getOneContactById')
const postOneContact = require('./postOneContact')
const deleteOneContactById = require('./deleteOneContactById')
const putOneContactById = require('./putOneContactById')
const patchFavoriteContactById = require('./patchFavoriteContactById')

module.exports = {
    getAllContacts,
    getOneContactById,
    postOneContact,
    deleteOneContactById,
    putOneContactById,
    patchFavoriteContactById
}