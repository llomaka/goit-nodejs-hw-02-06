const express = require('express')
const router = express.Router()
const { contactsController } = require('../../controllers')
const { controllerWrapper } = require('../../helpers')
const { validationBody, isValidId } = require('../../middlewares')
const { schemas } = require('../../models')

router.get('/', controllerWrapper(contactsController.getContacts))

router.get('/:contactId', isValidId, controllerWrapper(contactsController.getContactById))

router.post('/', validationBody(schemas.schemaAddContact), controllerWrapper(contactsController.addContact))

router.delete('/:contactId', controllerWrapper(contactsController.removeContact))

router.put('/:contactId', validationBody(schemas.schemaUpdateContact), controllerWrapper(contactsController.updateContact))

router.patch('/:contactId/favorite', validationBody(schemas.schemaUpdateFavorite), controllerWrapper(contactsController.updateFavorite))

module.exports = router
