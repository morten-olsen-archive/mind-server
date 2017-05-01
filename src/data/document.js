const DB = require('./db');

var Document = DB.Model.extend({
   tableName: 'documents'
});

module.exports = Document;
