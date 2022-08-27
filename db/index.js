const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact, countContacts } = require('./contacts')
const { addUser, getUserById, getUserByEmail, getAllUsers, updateUser } = require('./users')

module.exports = {
    listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact, countContacts,
    addUser, getUserById, getUserByEmail, getAllUsers, updateUser
}