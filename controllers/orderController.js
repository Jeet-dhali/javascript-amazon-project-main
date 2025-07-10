const { v4: uuidv4 } = require('uuid');
const Order = require('../models/orderSchema');
const User = require('../models/userSchema');
const { getProduct } = require('../middleware/getProductInfo');
const { getDeliveryId } = require('../middleware/getDeliveryInfo');
const { getUser } = require('../middleware/auth');

//user order
const placeOrderForUser = async (req, res) => {
  try {
    const jwt = req.cookies.jwt;
    const userData = getUser(jwt);
    if (!userData) return res.status(401).json({ message: 'Unauthorized' });

    const { cart, orderTotalCents } = req.body;
    const id = uuidv4();
    const orderTime = new Date();

    const processedProducts = cart.map((items) => {
      const product = getProduct(items.productId);
      const deliveryOption = getDeliveryId(items.deliveryOptionId);

      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + deliveryOption.deliveryDays);

      return {
        id: items.productId, // match your userSchema field name
        quantity: items.quantity,
        deliveryOptionId: items.deliveryOptionId,
        estimatedDeliveryTime: deliveryDate.toISOString()
      };
    });

    const newOrder = {
      id,
      orderTime,
      totalCostCents: orderTotalCents,
      products: processedProducts
    };

    await User.findByIdAndUpdate(
      userData._id,
      {
        $push: { orders: newOrder },
        $set: { cart: [] }
      },
      { new: true }
    );

    res.status(201).json({ message: 'Order placed', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

//
const getUserOrders = async (req, res) => {
  try {
    const jwt = req.cookies.jwt;
    const userData = getUser(jwt);
    if (!userData) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userData._id);
    res.json({ orders: user.orders || [] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = {
  placeOrderForUser,
  getUserOrders
};
