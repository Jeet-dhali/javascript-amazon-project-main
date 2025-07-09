const User = require('../models/userSchema');
const { setUser, getUser } = require('../middleware/auth');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email, password });
    
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate token
    const token = setUser(existingUser);
    
    // Set cookie
    res.cookie('jwt', token,);

    // Send response
    const response = { 
      success: true, 
      message: 'Login successful',
      user: {
        id: existingUser._id,
        email: existingUser.email
      }
    };
    
    
    res.json(response);
    
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { loginUser };