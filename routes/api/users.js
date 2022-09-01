const express = require('express')
const usersRouter = express.Router()
const { usersController: ctrl } = require('../../controllers')
const { controllerWrapper } = require('../../helpers')
const { auth, validationBody, upload } = require('../../middlewares')
const { userSchemas } = require('../../models')

usersRouter.post('/register', validationBody(userSchemas.schemaRegister), controllerWrapper(ctrl.register))

usersRouter.post('/login', validationBody(userSchemas.schemaLogin), controllerWrapper(ctrl.login))

usersRouter.patch('/avatars', auth, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

usersRouter.get('/current', auth, controllerWrapper(ctrl.current))

usersRouter.get('/logout', auth, controllerWrapper(ctrl.logout))

usersRouter.patch('/', auth, validationBody(userSchemas.schemaSubscription), controllerWrapper(ctrl.subscription))

usersRouter.get('/verify/:verificationToken', controllerWrapper(ctrl.verification))

usersRouter.post('/verify', validationBody(userSchemas.schemaVerification), controllerWrapper(ctrl.repeatVerify))

module.exports = usersRouter
