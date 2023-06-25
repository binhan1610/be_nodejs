const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dangbinhan1610:binhan1012001@cluster0.zphxwo8.mongodb.net/mindx', { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    const cartItemSchema = new mongoose.Schema({
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
          },
          quantity: {
            type: Number,
            default: 1
          },
          price: {
            type: Number,
            required: true
          }
    }, { collection: 'cartitem' });

const cartItemtModel = mongoose.model('cartitem', cartItemSchema)

module.exports = { cartItemtModel }