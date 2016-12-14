const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');

const db = require('./db');
const mongoose = require('mongoose');
mongoose.connect(db.url);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport config
app.use(session({
  secret: 'shhsecret',
  resave: true,
  saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const routes = require('./routes/index')(passport);
app.use('/', routes);

const initPassport = require('./passport/init');
initPassport(passport);



app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 400;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen(port);
module.exports = app;
