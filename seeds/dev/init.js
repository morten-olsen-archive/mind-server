
const bcrypt = require('bcrypt-nodejs');

exports.seed = function(knex, Promise) {
  return Promise.resolve()
    .then(() => knex('users').del())
    .then(() => knex('documents').del())
    .then(() => knex('users').insert([{
      id: 1,
      email: 'morten@olsen.io',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8), null) },
    ]));
};
