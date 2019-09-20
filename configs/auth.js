const LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User');
const { checkPassword } = require('../helpers');
const passport = require('passport');

const logger = require('./logging');
logger.info(' ✓ Authentication configured ');

const configureAuth = app => {
  app.use(passport.initialize()).use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .exec((err, user) => done(err, user));
  });

  passport.use(checkSigninStrategy);
  // More and more strategies of authentication here
};

const checkSignin = async (email, providedPassword, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() })
      .select({ password: 1 })
      .exec();

    if (!user) return done({ msg: 'NOT_FOUND' });

    const isPasswordCorrect = await checkPassword(providedPassword, user);

    if (!isPasswordCorrect) return done({ msg: 'INVALID_CREDENTIALS' });

    user.lastLogin = new Date();

    await user.save();

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const mappingFields = { usernameField: 'email', passwordField: 'password' };

const checkSigninStrategy = new LocalStrategy(mappingFields, checkSignin);

module.exports = { configureAuth };
