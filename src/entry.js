
const { migrate } = require('./data/knex');

migrate.then(() => {
  const express = require('express');
  const sync = require('./sync');
  const gateway = require('./gateway');
  const { withError } = require('./utils/express');

  const app = express();
  app.use(withError);
  app.use('/sync', sync);
  app.use('/gateway', gateway);

  app.listen(5000);
});
