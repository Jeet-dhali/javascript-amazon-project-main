const User = require('../models/userSchema');
const { getUser } = require('../middleware/auth');

const updateUserCart = async (req, res) => {
  try {
    const jwt = req.cookies.jwt;
    const userData = getUser(jwt);
    if (!userData) return res.status(401).json({ message: 'Unauthorized' });

    const { cart } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userData._id, {
      cart: cart
    }, { new: true });

    res.json({ message: 'Cart updated successfully', cart: updatedUser.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const jwt = req.cookies.jwt;
    const userData = getUser(jwt);
    if (!userData) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userData._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

module.exports = { updateUserCart, getUserCart };
