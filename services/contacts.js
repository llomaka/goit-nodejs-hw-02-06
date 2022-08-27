const { listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
    countContacts
} = require('../db')

const listContactsData = async (owner, offset, limit) => {
    try {
        return await listContacts(owner, offset, limit)
    } catch (error) {
        return error
    }
}

const countContactsData = async (owner) => {
    try {
        return await countContacts(owner)
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

const updateStatusContactByIdData = async (id, favoriteObject) => {
    try {
        return await updateStatusContact(id, favoriteObject)
    } catch (error) {
        return error
    }
}

module.exports = { listContactsData, listContactByIdData, removeContactById, addContactData, updateContactByIdData, updateStatusContactByIdData, countContactsData }