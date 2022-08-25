const express = require('express')
const router = express.Router()
const { contactsController } = require('../../controllers')
const { controllerWrapper } = require('../../helpers')
const { validationBody, isValidId } = require('../../middlewares')
const { contactSchemas } = require('../../models')

router.get('/', controllerWrapper(contactsController.getContacts))

router.get('/:contactId', isValidId, controllerWrapper(contactsController.getContactById))

router.post('/', validationBody(contactSchemas.schemaAddContact), controllerWrapper(contactsController.addContact))

router.delete('/:contactId', controllerWrapper(contactsController.removeContact))

router.put('/:contactId', validationBody(contactSchemas.schemaUpdateContact), controllerWrapper(contactsController.updateContact))

router.patch('/:contactId/favorite', validationBody(contactSchemas.schemaUpdateFavorite), controllerWrapper(contactsController.updateFavorite))

module.exports = router
