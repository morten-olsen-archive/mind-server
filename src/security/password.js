const bcrypt = require('bcrypt-nodejs');

exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

exports.validPassword = function(password, storedPassword) {
    return bcrypt.compareSync(password, storedPassword);
};
