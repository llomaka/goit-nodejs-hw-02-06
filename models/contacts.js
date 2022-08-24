const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleSchemaValidationErrors } = require('../helpers')

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegex = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        match: nameRegex,
    },
    email: {
        type: String,
        match: emailRegex,
    },
    phone: {
        type: String,
        match: phoneRegex,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true })

contactsSchema.post('save', handleSchemaValidationErrors)

const Contacts = model('Contacts', contactsSchema)

const schemaAddContact = Joi.object({
    name: Joi.string()
        .label('Full Name')
        .pattern(nameRegex)
        .required(),

    email: Joi.string()
        .label('Email Address')
        .email({ minDomainSegments: 2 })
        .pattern(emailRegex)
        .required(),
    
    phone: Joi.string()
        .label('Phone Number')
        .pattern(phoneRegex)
        .min(5)
        .max(20)
        .required(),
  
    favorite: Joi.bool()
        .label('Favorite'),
})

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .label('Full Name')
        .pattern(nameRegex),

    email: Joi.string()
        .label('Email Address')
        .email({ minDomainSegments: 2 })
        .pattern(emailRegex),
    
    phone: Joi.string()
        .label('Phone Number')
        .pattern(phoneRegex),
})

const schemaUpdateFavorite = Joi.object({
    favorite: Joi.bool()
        .label('Favorite')
        .required(),
})

const schemas = { schemaAddContact, schemaUpdateContact, schemaUpdateFavorite }

module.exports = {
    Contacts,
    schemas
}