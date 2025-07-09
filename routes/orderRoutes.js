const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');

// POST /api/orders
router.post('/orders', createOrder);

module.exports = router;
