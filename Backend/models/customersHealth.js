const mongoose = require('mongoose');

const customersHealthSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  steps: {
    type: Number
  }
});

module.exports = mongoose.model('customershealth', customersHealthSchema);



