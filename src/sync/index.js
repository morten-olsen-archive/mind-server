const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const Document = require('../data/document');
const user = require('../security/user');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(user);

app.get('/profile', (req, res) => {
  res.json(req.user);
});

app.post('/documents', (req, res) => {
  const body = req.body;
  Document.query((q) => {
    let position = q.where({
      user_id: req.user.id,
    });
    return body.filters.forEach((filter, i) => {
      if (filter.field !== 'flag') {
        const type = filter.not ? 'andWhereNot' : 'andWhere';
        switch(filter.type) {
          case '=':
          case '>':
          case '>=':
          case '<':
          case '<=':
            position = position[type](filter.field, filter.type, filter.value);
            break;
          default:
            return null;
        }
      } else {
        if (filter.type === '=' && filter.value === 'updated') {
          position = position
            .andWhere('updated', '>', req.body.lastUpdated)
            .andWhere('client', '!=', req.headers.client)
        }
      }
    });
    if (body.take > 0) {
      position = position.limit(body.take);
    }
    if (body.skip > 0) {
      position = position.offset(body.skip);
    }
  })
  .fetchAll()
  .then(response => {
    res.json(response ? response.toJSON() : null);
  });
});

app.post('/documents/:id', (req, res) => {
  const body = {
    created: req.body.created,
    updated: req.body.updated,
    title: req.body.title,
    body: req.body.body,
    id: req.params.id,
    user_id: req.user.id,
    client: req.headers.client,
  };
  return new Document({
    id: req.params.id,
  })
  .fetch()
  .then(result => {
    if (result && result.get('user_id') !== req.user.id) {
      res.error('unautorized', 403);
    } else {
      const method = result ? 'update' : 'insert';
      new Document(body).save(null, { method }).then(response => {
        res.json(response.toJSON());
      });
    }
  });
});

app.delete('/:collection/:id', (req, res) => {

});

module.exports = app;
