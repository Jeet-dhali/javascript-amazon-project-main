const User = require('../models/userSchema');
const { setUser, getUser } = require('../middleware/auth')

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email, password });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Simple password check
    /*if (existingUser.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }*/
   const token = setUser(existingUser);
   res.cookie("jwt", token, {
    httpOnly: false,      
    sameSite: 'Lax',
    secure: false ,
    maxAge: 24 * 60 * 60 * 1000, 
    path: '/'
   });

    // Create and save new user
    
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { loginUser };
