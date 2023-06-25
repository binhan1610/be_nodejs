const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dangbinhan1610:binhan1012001@cluster0.zphxwo8.mongodb.net/mindx', { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    const productSchema = new mongoose.Schema({
        title:String,
        img:String,
        price: Number,
        type: String
    }, { collection: 'products' });

const productModel = mongoose.model('product', productSchema)

module.exports = { productModel }