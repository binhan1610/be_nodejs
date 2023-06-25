const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dangbinhan1610:binhan1012001@cluster0.zphxwo8.mongodb.net/mindx', { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    const shopteaSchema = new mongoose.Schema({
        name:String,
        lat:Number,
        address: String,
        lon: Number
    }, { collection: 'shopteas' });

const shopteaModel = mongoose.model('shoptea', shopteaSchema)

module.exports = { shopteaModel }