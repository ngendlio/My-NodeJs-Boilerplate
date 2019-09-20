const logger = require('../configs/logging');
const passport = require('passport');
const { genJwtToken } = require('../helpers');

exports.login = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err.msg == 'INVALID_CREDENTIALS') return res.status(403).send(err);
    else if (err.msg == 'NOT_FOUND') return res.status(404).send();

    const token = genJwtToken(user);

    return res.send(token);
  })(req, res, next);
};

exports.logout = (req, res) => {
  res.end();
};
