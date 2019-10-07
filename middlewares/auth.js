const { USER_TYPES } = require('../helpers/constants');
const { ADMIN } = USER_TYPES;

exports.isAuthenticated = (req, res, next) =>
  req.user ? next() : res.status(401).send('This path requires authentication !');

exports.isAdmin = (req, res, next) =>
  req.user && req.user.type === ADMIN
    ? next()
    : res.status(403).send('You are not authorized to access this resource');
