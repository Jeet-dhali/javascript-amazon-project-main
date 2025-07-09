const { setUser, getUser } = require('../middleware/auth');
const User = require('../models/userSchema'); 

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save new user
    const newUser = await User.create({ name, email, password });

    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

module.exports = { registerUser };
