const mongoose = require('mongoose');

const harvestSchema = new mongoose.Schema({
    supplier: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', req: true},
    name: 
    { type: String, req: true },
    description: 
    { type: String, req: true},
    plantation: 
    { type: String, req: true },
    date: 
    { type: Date, req: true },
    quantity: 
    { type: Number, req: true }
});

module.exports = mongoose.model('Harvest', harvestSchema);