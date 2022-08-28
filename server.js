const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const app = require('./app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connection successful')
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => {
  console.log('Connection error: ', error.message)
  process.exit(1)
})
