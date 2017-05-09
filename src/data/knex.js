const config = require('../utils/config');
var knex = require('knex')(config.knex);

exports.migrate = knex.migrate.latest()
  .then(function() {
    return knex.seed.run();
  });
exports.knex = knex;
