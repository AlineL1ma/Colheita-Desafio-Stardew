const Supplier = require('../models/supplier');
const bcrypt = require('bcryptjs');

//Para criar um novo fornecedor
exports.createSupplier = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const supplier = new Supplier({ name, email, password });
        await supplier.save();
        res.status(201).json(supplier);
    } catch (err) {
        res.status(400).json({ error: err.message})
    }
};

//Para listar todos os usuários
exports.getSupplier = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Para buscar um fornecedor por ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.status(200).json(supplier);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Para fazer um login
exports.login = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const supplier = await Supplier.findOne({ name });
        if (!supplier) return res.status(400).json({ message: 'Fornecedor não encontrado' });

        const isMatch = await bcrypt.compare(password, supplier.password);
        if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

        res.status(200).json({ message: 'Login bem-sucedido', supplier });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Para atualizar um usuário
exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const updatedSupplier = await Supplier.findByIdAndUpdate(id, { name, email, password }, { new: true });
        if (!updatedSupplier) return res.status(404).json({ message: 'Fornecedor não encontrado' });

        res.status(200).json(updatedSupplier);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Para excluir um fornecedor
exports.deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        if (!deletedSupplier) return res.status(404).json({ message: 'Fornecedor não encontrado' });

        res.status(200).json({ message: 'Fornecedor excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};