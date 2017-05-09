const DB = require('./db');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

var User = DB.Model.extend({
  tableName: 'users',
  idAttribute: 'id',
  initialize: function() {
    this.on('creating', this.hashPassword, this);
  },

  hashPassword: function(model, attrs, options) {
    const hash = bcrypt.hashSync(model.attributes.password, bcrypt.genSaltSync(8), null);
    model.set('password', hash);
    return hash;
  },
  validatePassword: function(password) {
    return bcrypt.compareSync(password, this.get('password'));
  },
  getToken: function() {
    return jwt.sign({
      id: this.get('id'),
    }, 'shhhhh');
  }
}, {
  getFromToken(token) {
    return Promise.resolve()
      .then(() => {
        return jwt.verify(token, 'shhhhh')
      })
      .then(({ id }) => {
        return User.forge({ id }).fetch().then(user => {
          if (user) {
            return Object.assign(user.toJSON(), {
              password: undefined,
            });
          } else {
            throw new Error('Invalid JWT');
          }
        });
      });
  }
});
module.exports = User;
