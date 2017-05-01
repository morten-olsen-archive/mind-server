const User = require('../data/user');

module.exports = (req, res, next) => {
  const token = req.headers.token;
  return User.getFromToken(token).then(user => {
    req.user = {
      id: user.id,
      email: user.email,
    };
    return next();
  }).catch(err => {
    res.error(err);
  });
}
