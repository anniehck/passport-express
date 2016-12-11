const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
    passport.use('local-login', new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ 'username': username },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            console.log('User not found with username ' + username);
            return done(null, false,
                req.flash('message', 'User not found'));
          }
          if (!isValidPassword(user, password)) {
            console.log('Invalid password');
            return done(null, false,
                req.flash('message', 'Invalid password'));
          }
          return done(null, user);
        }
      );
    })
  );

  let isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
  }
}
