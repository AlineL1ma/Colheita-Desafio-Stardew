const harvest = require('../models/harvest');

//Pra criar uma nova colheita
exports.createHarvest = async (req, res) => {
    try {
        const { supplier, plantation, date } = req.body;
        const harvest = new harvest({ supplier, plantation, date });
        await harvest.save();
        res.status(201).json(harvest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Para listar as colheitas
exports.getHarvests = async (req, res) => {
    try {
        const harvest = await harvest.find().populate('supplier', 'plantation', 'name');
        res.status(200).json(harvest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getHarvestsById = async (req, res) => {
    try {
        const harvest = await harvest.findById(req.params.id).populate('supplier', 'plantation', 'name');
        if (!harvest) {
            return res.status(404).json({ message: 'Colheita não encontrada' });
        }
        res.status(200).json(harvest);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
}

//Para atualizar uma colheita
exports.updateHarvest = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplier, name, description, date, quantity } = req.body;

        const updatedHarvest = await harvest.findByIdAndUpdate(id, { supplier, name, description, plantation, date, quantity }, {new: true});
        if (!updatedHarvest) return res.status(404).json({ message: 'Colheita não encontrada' });

        res.status(200).json(updatedHarvest);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
};

//Para deletar uma colheita
exports.deleteHarvest = async (req, res) => {
    try {
        const { id } =req.params;
        const deletedHarvest = await harvest.findByIdAndDelete(id);
        if (!deletedHarvest) return res.status(404).json({ message: 'Colheita não encontrada'});
   
        res.status(200).json({ message: 'Colehita excluída com sucesso!'});
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
}