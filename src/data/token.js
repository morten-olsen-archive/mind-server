const DB = require('./db');

var Token = DB.Model.extend({
   tableName: 'token',
   user: function() {
     return this.belongsTo(Book);
   },
});

module.exports = Token;
