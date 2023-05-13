const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mindx', { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: [String]
})

const userModel = mongoose.model('users', userSchema)

module.exports = { userModel }