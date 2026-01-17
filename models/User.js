
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Please provide a name'], 
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'], 
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ] // A regular expression to validate the email format.
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'], 
    minlength: 6, 
    select: false, // This ensures the password is not sent back in query results by default.
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);