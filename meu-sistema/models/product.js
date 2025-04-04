const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    harvest: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'Harvest', req: true },
    name: 
    { type: String, req: true },
    quantity: 
    { type: Number, req: true },
    price: 
    { type: Number, req: true }
});

module.exports = mongoose.model('Product', productSchema);