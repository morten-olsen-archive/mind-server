const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('../data/user');
const Token = require('../data/token');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('login', {
    callback: req.query.callback,
  });
});

app.post('/', (req, res) => {
  User.forge({ email: req.body.email })
    .fetch()
    .then((user) => {
      if (user.validatePassword(req.body.password)) {
        const token = {
          url: `http://${req.headers.host}/sync`,
          token: user.getToken(),
        }
        res.redirect(req.body.callback + '#set-token:' + JSON.stringify(token));
      } else {
        throw new Error('invalid password');
      }
    });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    callback: req.query.callback,
  });
});

app.post('/signup', (req, res) => {
  User.forge({
    email: req.body.email,
    password: req.body.password,
  }).save().then((response) => {
    res.redirect('./?callback=' + req.body.callback);
  });
});

module.exports = app;
