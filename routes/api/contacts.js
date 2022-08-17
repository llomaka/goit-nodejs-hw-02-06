const express = require('express')

const router = express.Router()

const contactsController = require('../../controllers/contacts')

const { controllerWrapper } = require('../../helpers')

router.get('/', controllerWrapper(contactsController.getAllContacts))

router.get('/:contactId', controllerWrapper(contactsController.getOneContactById))

router.post('/', controllerWrapper(contactsController.postOneContact))

router.delete('/:contactId', controllerWrapper(contactsController.deleteOneContactById))

router.put('/:contactId', controllerWrapper(contactsController.putOneContactById))

router.patch('/:contactId/favorite', controllerWrapper(contactsController.patchFavoriteContactById))

module.exports = router
