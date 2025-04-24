const express = require('express');
const router = express.Router();
const { createSupplier, getSupplier, login, updateSupplier, deleteSupplier, getSupplierById } = require('../controllers/SupplierController');

// Rotas de usuários
router.post('/', createSupplier);
router.get('/', getSupplier);
router.get('/:id', getSupplierById);
router.post('/login', login);
router.put('/:id', updateSupplier); 
router.delete('/:id', deleteSupplier); 

module.exports = router;
