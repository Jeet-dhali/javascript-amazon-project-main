const express = require('express');
const router = express.Router();
const { updateUserCart, getUserCart } = require('../controllers/updateUserCart');
const { restrictToLoggedInUser } = require('../middleware/authoriseUser');
const { deleteCartItem } = require('../controllers/deleteCartItem');
//post
router.post('/user/cart',restrictToLoggedInUser, updateUserCart);
//get
router.get('/user/cart', restrictToLoggedInUser, getUserCart);
//del
router.delete('/user/cart/:productId', restrictToLoggedInUser, deleteCartItem);

module.exports = router;
