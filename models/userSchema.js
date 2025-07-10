const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [{
    id: {
      type: String
    },
    quantity: {
      type: Number
    },
    deliveryOptionId: {
      type: String
    }
  }],
  orders: [
    {
      productId: String,
      orderTime: Date,
      totalCostCents: Number,
      products: [
        {
          id: String,
          quantity: Number,
          deliveryOptionId: String
        }
      ]
    }
  ]
  
});

module.exports = mongoose.model('User', userSchema);
