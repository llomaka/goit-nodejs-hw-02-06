const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require('./contacts')
const { addUser, getUserById, getUserByEmail, getAllUsers } = require('./users')

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact, addUser, getUserById, getUserByEmail, getAllUsers }