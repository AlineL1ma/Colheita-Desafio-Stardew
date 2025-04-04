const Harvest = require('../models/harvest');

//Pra criar uma nova colheita
exports.createHarvest = async (req, res) => {
    try {
        const { supplier, plantation, date, quantity } = req.body;
        const harvest = new Harvest({ supplier, plantation, date, quantity });
        await harvest.save();
        res.status(201).json(harvest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Pra listar as colheitas
exports.getHarvests = async (req, res) => {
    try {
        const harvests = await Harvest.find().populate('supplier', 'plantation', 'name');
        res.status(200).json(harvests);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getHarvestsById = async (req, res) => {
    try {
        const harvest = await Harvest.findById(req.params.id).populate('supplier', 'plantation', 'name');
        if (!harvest) {
            return res.status(404).json({ message: 'Colheita não encontrada' });
        }
        res.status(200).json(harvest);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
}

//Pra atualizar uma colheita
exports.updateHarvest = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplier, name, description, date, quantity } = req.body;

        
    }
}