require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('connections successful')
}).catch((error) => {
    console.log('connection error: ', error.message)
});

// const Schema = mongoose.Schema;