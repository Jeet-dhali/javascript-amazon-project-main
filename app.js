const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { product, getProduct } = require('./backendData/productInfo');
const { getDeliveryId, deliveryOptions } = require('./backendData/deliveryInfo');
const cors = require('cors');
const mongoose = require('mongoose');
const Order = require('./models/orderSchema');


//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/orderRequest', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(' MongoDB connection error:', err);
});

//middleware

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'https://jeet-dhali.github.io',
}));

// Add POST route for /api/orders
app.post('/api/orders', async (req, res) => {
  const orderTime = new Date();
  const id = uuidv4();
  const { cart } = req.body;
  const { orderTotalCents } = req.body;
  const processedProducts = cart.map((items) => {
  const product = getProduct(items.productId);
  const deliveryOption = getDeliveryId(items.deliveryOptionId);
  const quantity = items.quantity;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + deliveryOption.deliveryDays);

  return {
    productId: items.productId,
    quantity,
    estimatedDeliveryTime: deliveryDate.toISOString()
  };
  });

  const newOrders = new Order({
  id: `${id}`,
  orderTime: `${orderTime}`,
  totalCostCents: orderTotalCents,
  products: processedProducts
})

  await newOrders.save();
  res.json(newOrders);

});

app.listen(5000, () => {
  console.log('🚀 Server is running on http://localhost:5000');
});
