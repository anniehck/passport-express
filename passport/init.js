const login = require('./login');
const signup = require('./signup');
const User = require('../models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('Serializing user: ' + user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      console.log('Deserializing user: ' + user);
      done(err, user);
    });
  });

  login(passport);
  signup(passport);

}
