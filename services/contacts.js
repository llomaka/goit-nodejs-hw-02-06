const { listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact } = require('../models/contacts')

const listContactsData = async () => {
    try {
        return await listContacts()    
    } catch (error) {
        console.log('Error: ', error.message)
    }
}

const listContactByIdData = async (id) => {
    try {
        return await getContactById(id)    
    } catch (error) {
        console.log('Error: ', error.message)
    }
}

const removeContactById = async (id) => {
    try {
        return await removeContact(id)
    } catch (error) {
        console.log('Error: ', error.message)
    }
}

const addContactData = async (contact_object) => {
    try {
        return await addContact(contact_object)
    } catch (error) {
        console.log('Error: ', error.message)
    }
}

const updateContactByIdData = async (id, contact_object) => {
    try {
        return await updateContact(id, contact_object)
    } catch (error) {
        console.log('Error: ', error.message)
    }
}

module.exports = { listContactsData, listContactByIdData, removeContactById, addContactData, updateContactByIdData }