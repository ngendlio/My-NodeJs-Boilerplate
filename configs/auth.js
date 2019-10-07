const logger = require('./logging');
const redis = require('../integrations/redis');

logger.info(' ✓ Authentication configured ');
/**
 * This middleware will extract the beare token from the headers
 * and will extract corresponding key in redis
 * and will append it to the object req.user
 * @param {*} app
 */
const configureAuth = app =>
  app.use(async (req, res, next) => {
    try {
      const header = req.headers['authorization'];

      if (!header) return next();

      const [, token] = header.startsWith('Bearer ') ? header.split('Bearer ') : '';

      const results = await redis.getKey(`${token}`);

      req.user = JSON.parse(results);

      return next();
    } catch (error) {
      logger.issue('Failed to check if user is authenticated ' + error.message, res);
    }
    return next();
  });

module.exports = { configureAuth };
