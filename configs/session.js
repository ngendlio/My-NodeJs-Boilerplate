const config = require('./index');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const COOKIE_NAME = 'PHPSESSID'; // You can even spoof PHP cookie name ;)
const passport = require('passport');

const logger = require('./logging');
logger.info(' ✓ Session configured ');

require('./auth')(passport);

module.exports = app => {
  app
    .use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: config.SESSION_SECRET,
        name: COOKIE_NAME,
        cookie: { path: '/', httpOnly: true },
        store: new RedisStore({
          host: config.REDIS_HOST,
          port: config.REDIS_PORT,
          pass: config.REDIS_SECRET,
          prefix: config.REDIS_PREFIX,
          name: config.REDIS_NAME
        })
      })
    )
    .use(passport.initialize())
    .use(passport.session());
};
