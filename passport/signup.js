const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
    passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      findOrCreateUser = () => {
        User.findOne({ 'username': username }, (err, user) => {
          if (err) {
            console.log('Error in signup: ' + err);
            return done(err);
          }
          if (user) {
            console.log('User already exists with username ' + username);
            return done(null, false, req.flash('message', 'User already exists'));
          } else {
            let newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.param('email');
            newUser.name = req.param('name');
            newUser.save((err) => {
              if (err) {
                console.log('Error in saving user: ' + err);
                throw err;
              }
              console.log('User registration successful!');
              return done(null, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    })
  );

  let createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
}
