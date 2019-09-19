const LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User');

const logger = require('./logging');
logger.info(' ✓ Authentication configured ');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .exec((err, user) => done(err, user));
  });

  passport.use('local', checkSigninStrategy);
  // More and more strategies of authentication here
};

const checkSignin = async (email, providedPassword, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
      'password'
    );

    if (!user) return done(err, user);

    const isPasswordCorrect = await user.comparePassword(providedPassword, user);

    if (!isPasswordCorrect) return done(err, false, { msg: 'INVALID_CREDENTIALS' });

    user.lastLogin = new Date();

    await user.save();

    return done(null, user);
  } catch (error) {
    return done(err, false);
  }
};

const mappingFields = { usernameField: 'email', passwordField: 'password' };

const checkSigninStrategy = new LocalStrategy(mappingFields, checkSignin);
