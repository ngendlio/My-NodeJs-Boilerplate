const config = require('./index');
const pino = require('pino');

const logger = pino({
  name: config.APP_NAME,
  prettyPrint: config.isDev ? true : false,
  redact: {
    paths: ['password', 'user.password', 'pin'],
    censor: '**GDPR COMPLIANT**'
  },
  enabled: true
});

/**Custom log levels */

logger.issue = (error, res) => {
  logger.fatal(error);

  if (res) res.status(500).send('Service not available');
};

module.exports = logger;
