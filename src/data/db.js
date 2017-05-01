const { knex } = require('./knex');

var Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
