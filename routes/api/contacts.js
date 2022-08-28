const express = require('express')
const router = express.Router()
const { contactsController } = require('../../controllers')
const { controllerWrapper } = require('../../helpers')
const { validationBody, isValidId, auth } = require('../../middlewares')
const { contactSchemas } = require('../../models')

router.get('/', auth, controllerWrapper(contactsController.getContacts))

router.get('/:contactId', auth, isValidId, controllerWrapper(contactsController.getContactById))

router.post('/', auth, validationBody(contactSchemas.schemaAddContact), controllerWrapper(contactsController.addContact))

router.delete('/:contactId', auth, controllerWrapper(contactsController.removeContact))

router.put('/:contactId', auth, validationBody(contactSchemas.schemaUpdateContact), controllerWrapper(contactsController.updateContact))

router.patch('/:contactId/favorite', auth, validationBody(contactSchemas.schemaUpdateFavorite), controllerWrapper(contactsController.updateFavorite))

module.exports = router
