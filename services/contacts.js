const { listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact } = require('../db/mongodb')

const listContactsData = async () => {
    try {
        return await listContacts()    
    } catch (error) {
        return error
    }
}

const listContactByIdData = async (id) => {
    try {
        return await getContactById(id)    
    } catch (error) {
        return error
    }
}

const removeContactById = async (id) => {
    try {
        return await removeContact(id)
    } catch (error) {
        return error
    }
}

const addContactData = async (contactObject) => {
    try {
        return await addContact(contactObject)
    } catch (error) {
        return error
    }
}

const updateContactByIdData = async (id, contactObject) => {
    try {
        return await updateContact(id, contactObject)
    } catch (error) {
        return error
    }
}

module.exports = { listContactsData, listContactByIdData, removeContactById, addContactData, updateContactByIdData }