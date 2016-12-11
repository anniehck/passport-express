const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

module.exports = mongoose.model('User', {
  id: String,
  name: String,
  username: String,
  email: String,
  password: String
});
