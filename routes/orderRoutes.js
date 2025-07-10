const express = require('express');
const router = express.Router();
const { createOrder, placeOrderForUser, getUserOrders } = require('../controllers/orderController');
const { restrictToLoggedInUser } = require('../middleware/authoriseUser');

// POST /api/orders
router.post('/user/orders',restrictToLoggedInUser, placeOrderForUser);
router.get('/user/orders', restrictToLoggedInUser, getUserOrders);

module.exports = router;
