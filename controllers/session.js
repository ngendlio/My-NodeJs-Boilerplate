const passport = require('passport');
const logger = require('../configs/logging');

exports.login = async (req, res) => {
  try {
    const user = await passport.authenticate('local');
    req.logIn(user, (err, user) => {
      return res.send(user);
    });
  } catch (error) {
    logger.issue(error);
  }
};

exports.logout = (req, res) => {
  res.end();
};
