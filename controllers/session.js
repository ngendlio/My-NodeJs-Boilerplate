const logger = require('../configs/logging');
const { saveUserSession } = require('../helpers/session');
const { checkPassword } = require('../helpers');
const User = require('../models/User');

exports.login = async (req, res, next) => {
  req.assert('email', ' A valid email is required ').notEmpty();
  req.assert('password', 'The password is required').notEmpty();

  if (req.validationErrors()) return res.status(400).send(req.validationErrors()[0]);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() })
      .select({ password: 1 })
      .exec();

    if (!user) return res.status(404).send();

    const isPasswordCorrect = await checkPassword(password, user);

    if (!isPasswordCorrect) return res.status(403).send(err);

    user.lastLogin = new Date();

    await user.save();

    const token = await saveUserSession(user._id);

    return res.send({ token });
  } catch (error) {
    logger.issue('Failed to authenticate ' + error.message);
    return res.status(500).send('Internal server error');
  }
};

exports.logout = (req, res) => res.end();
