const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'pharmacist', 'sales_attendant'], // The 3 roles you want
    default: 'sales_attendant' 
  }
});

module.exports = mongoose.model('User', userSchema);