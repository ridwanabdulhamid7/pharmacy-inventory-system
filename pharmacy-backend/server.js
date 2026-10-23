const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoute = require('./routes/auth'); // 1. Import the route here

const app = express(); // 2. CREATE 'app' FIRST

// 3. THEN use 'app' for middleware and routes
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Pharmacy API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));