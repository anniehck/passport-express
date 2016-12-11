const express = require('express');
const passport = require('passport');
let router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Expressions' });
});

router.get('/login', (req, res, next) => {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', (req, res) => {
  res.render('signup.ejs', { message: req.flash('loginMessage') });
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile.ejs', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
