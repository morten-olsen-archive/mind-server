const configs = require('../../knexfile.js');
const cnf = configs[process.env.NODE_ENV || 'development'];
var knex = require('knex')(cnf);

exports.migrate = knex.migrate.latest()
  .then(function() {
    return knex.seed.run();
  });
exports.knex = knex;
