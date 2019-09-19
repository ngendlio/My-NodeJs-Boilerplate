const { USER_TYPES } = require('./constants');
const { ADMIN } = USER_TYPES;

exports.isAuthenticated = (req, res, next) =>
  req.isAuthenticated()
    ? next()
    : res.status(401).send('This path requires authentication !');

exports.isForAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.type === ADMIN) return next();

  return res.status(403).send('You are not authorized to access this resource');
};
