const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: String,
    required: true,
    trim: true
  },
  avg_steps: {
    type: Number
  },
  avg_sleep: {
    type: Number
  },
  avg_calories: {
    type: Number
  },
  goal: {
    type: Number
  }
});

module.exports = mongoose.model('customers', customerSchema);



