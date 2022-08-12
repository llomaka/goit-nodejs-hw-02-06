require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connection successful')
}).catch((error) => {
  console.log('connection error: ', error.message)
  process.exit(1)
})

const { Schema } = mongoose
const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const Contacts = mongoose.model('Contacts', contactsSchema)

const listContacts = async () => {
  try {
    return await Contacts.find({})
  } catch (error) {
    return error
  }
}

const getContactById = async (id) => {
  try {
    return await Contacts.findById(id)
  } catch (error) {
    return error
  }
}

const removeContact = async (id) => {
  try {
    return await Contacts.findByIdAndDelete(id)
  } catch (error) {
    return error
  }
}

const addContact = async (body) => {
  try {
    return await Contacts.create(body)
  } catch (error) {
    return error
  }
}

const updateContact = async (id, body) => {
  try {
    return await Contacts.findByIdAndUpdate(id, body)
  } catch (error) {
    return error
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact }