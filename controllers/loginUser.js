const User = require('../models/userSchema'); // your Mongoose schema

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Simple password check
    if (existingUser.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Create and save new user
    
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { loginUser };
