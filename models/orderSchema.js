const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  orderTime: String,
  totalCostCents: Number,
  products: [
    {
      productId: String,
      quantity: Number,
      estimatedDeliveryTime: String
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);
