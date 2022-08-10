const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string()
    .label('Full Name')
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),

  email: Joi.string()
    .label('Email Address')
    .email({ minDomainSegments: 2 })
    .required(),
    
  phone: Joi.string()
    .label('Phone Number')
    .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)
    .min(5)
    .max(20)
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/),

  email: Joi.string()
    .email({ minDomainSegments: 2 }),
    
  phone: Joi.string()
    .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/),
})

module.exports = { schemaAddContact, schemaUpdateContact }