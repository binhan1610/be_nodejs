const mongoose = require('mongoose')
const cartItemtModel =require('../models/cartitem')
mongoose.connect('mongodb+srv://dangbinhan1610:binhan1012001@cluster0.zphxwo8.mongodb.net/mindx', { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    const cartSchema = new mongoose.Schema({
        product: {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
              },
              items: [cartItemSchema]
            }},
     { collection: 'cart' });

const cartModel = mongoose.model('cart', cartSchema)

module.exports = { cartModel }