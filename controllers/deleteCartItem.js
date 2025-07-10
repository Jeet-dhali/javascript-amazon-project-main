const User = require('../models/userSchema');
const { getUser } = require('../middleware/auth');

const deleteCartItem = async (req, res) => {
  try {
    const jwt = req.cookies.jwt;
    const userData = getUser(jwt);
    if (!userData) return res.status(401).json({ message: 'Unauthorized' });

    const { productId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userData._id,
      {
        $pull: { cart: { id: productId } }
      },
      { new: true }
    );

    res.json({ message: 'Item removed from cart', cart: updatedUser.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item', error: err.message });
  }
};

module.exports = { deleteCartItem };
