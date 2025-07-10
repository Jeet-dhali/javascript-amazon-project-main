const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
