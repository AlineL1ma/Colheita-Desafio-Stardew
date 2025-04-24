const express = require('express');
const router = express.Router();
const { createHarvest, getHarvest, updateHarvest, deleteHarvest, getHarvestById } = require('../controllers/HarvestController');

// Rotas de plantações
router.post('/', createHarvest);
router.get('/', getHarvest);
router.get('/:id', getHarvest);
router.put('/:id', updateHarvest); 
router.delete('/:id', deleteHarvest); 
router.delete('/:id', getHarvestById); 

module.exports = router;