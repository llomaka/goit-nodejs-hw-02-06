const express = require('express')
const usersRouter = express.Router()
const { usersController: ctrl } = require('../../controllers')
const { controllerWrapper } = require('../../helpers')
const { auth, validationBody } = require('../../middlewares')
const { userSchemas } = require('../../models')

usersRouter.get('/', controllerWrapper(ctrl.listUsers))

usersRouter.post('/register', validationBody(userSchemas.schemaRegister), controllerWrapper(ctrl.register))

usersRouter.post('/login', validationBody(userSchemas.schemaLogin), controllerWrapper(ctrl.login))

usersRouter.get('/current', auth, controllerWrapper(ctrl.current))

usersRouter.get('/logout', auth, controllerWrapper(ctrl.logout))

usersRouter.patch('/', auth, validationBody(userSchemas.schemaSubscription), controllerWrapper(ctrl.subscription))

module.exports = usersRouter
