const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  id: String,
  name: String,
  username: String,
  email: String,
  password: String
});
