require('dotenv').config();
const { migrate } = require('./data/knex');
const express = require('express');
const sync = require('./sync');
const gateway = require('./gateway');
const { withError } = require('./utils/express');

migrate.then(() => {
  const app = express();
  app.use(withError);
  app.use('/sync', sync);
  app.use('/gateway', gateway);

  app.listen(5000);
})
.catch(err => {
  console.error(err);
});
