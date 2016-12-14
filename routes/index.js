const express = require('express');
const passport = require('passport');
const router = express.Router();

let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}

module.exports = (passport) => {
  router.get('/', (req, res, next) => {
    res.render('index', { title: 'Expressions' });
  });

  router.get('/login', (req, res, next) => {
    res.render('login', { message: req.flash('loginMessage') });
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    successFlash: 'Nice to see you again!',
    failureRedirect: '/login',
    failureFlash: true
  }));

  router.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('loginMessage') });
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    successFlash: 'Thanks for registering with us!',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile.ejs', { user: req.user });
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.get('/home', isAuthenticated, (req, res) => {
    res.render('home', { user: req.user });
  })

  return router;

}
