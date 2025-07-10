const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const {restrictToLoggedInUser} = require('./middleware/authoriseUser')


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/orderRequest')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true,
}));
app.use(cookieParser());

// Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);

const registerRoutes = require('./routes/registerRoutes');
app.use('/api', registerRoutes);

const loginRoutes = require('./routes/loginRoutes');
app.use('/api', loginRoutes);

const userCartRoutes = require('./routes/userCartRoutes');
app.use('/api', userCartRoutes);


// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
