const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const supplierSchema = 
new mongoose.Schema({
    name: 
    { type: String, req: true },
    email: 
    { type: String, req: true, unique: true },
    password: 
    { type: String, req: true, minlength: 8, match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,}$/ }
    //O match garante que a senha tenha ao menos um caractere de cada elemento pedido
});

// Criptografia do usuário
supplierSchema.pre('save', async function (next) 
{
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Supplier', supplierSchema);