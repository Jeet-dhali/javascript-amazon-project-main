const { v4: uuidv4 } = require('uuid');
const Order = require('../models/orderSchema');
const { getProduct } = require('../middleware/getProductInfo');
const { getDeliveryId } = require('../middleware/getDeliveryInfo');

const createOrder = async (req, res) => {
  try {
    const orderTime = new Date();
    const id = uuidv4();
    const { cart, orderTotalCents } = req.body;

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

    const newOrder = new Order({
      id,
      orderTime: orderTime.toISOString(),
      totalCostCents: orderTotalCents,
      products: processedProducts
    });

    await newOrder.save();
    res.status(201).json(newOrder);

  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order' });
  }
};

module.exports = { createOrder };
