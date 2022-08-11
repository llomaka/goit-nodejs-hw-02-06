const express = require('express')

const router = express.Router()

const contactsController = require('../../controllers/contacts')

router.get('/', contactsController.getAllContacts)

router.get('/:contactId', contactsController.getOneContactById)

router.post('/', contactsController.postOneContact)

router.delete('/:contactId', contactsController.deleteOneContactById)

router.put('/:contactId', contactsController.putOneContactById)

module.exports = router
