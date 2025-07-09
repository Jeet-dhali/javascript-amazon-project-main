const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/orderRequest')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*'
}));

// Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);

const registerRoutes = require('./routes/registerRoutes');
app.use('/api', registerRoutes);

const loginRoutes = require('./routes/loginRoutes');
app.use('/api', loginRoutes);

// Start server
app.listen(5500, () => {
  console.log('Server is running on http://localhost:5500');
});
