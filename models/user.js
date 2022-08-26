const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const { handleSchemaValidationErrors } = require('../helpers')

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String
}, { versionKey: false, timestamps: true })

userSchema.post('save', handleSchemaValidationErrors)

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const User = model('Users', userSchema)

const schemaRegister = Joi.object({
    password: Joi.string()
        .label('User Password')
        .min(6)
        .required(),

    email: Joi.string()
        .label('Email Address')
        .pattern(emailRegex)
        .required(),
    
    subscription: Joi.string()
        .label('Subscription Type')
        .valid("starter", "pro", "business"),
})

const schemaLogin = Joi.object({
    password: Joi.string()
        .label('User Password')
        .required(),

    email: Joi.string()
        .label('Email Address')
        .pattern(emailRegex)
        .required(),
})

const userSchemas = { schemaRegister, schemaLogin }

module.exports = {
    User,
    userSchemas
}