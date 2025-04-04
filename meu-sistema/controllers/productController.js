const Product = require('../models/product');

// Criar um novo produto
exports.createProduct = async (req, res) => {
    try {
        const { name, description, validated, harvest, supplier }= req.body;
        const product = new Product({ name, description, validated, harvest, supplier });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
}

//Para listar produtos
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.find().populate('Harvest');
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message})
    }
};

//Atualizar produtos
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, validated, harvest, supplier } = req.body;
        const updatedProduct = await Product.find().populate('Harvest, supplier');
        if (!updatedProduct) return res.status(400).json({ message: 'Produto não encontrado'});

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Para excluir um produto
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.find().populate('Harvest, supplier');
        if (deletedProduct) return res.status(400).json({ message: 'Produto não encontrado'});

        res.status(200).json({ message: 'Produto excluído com sucesso!'});
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
};