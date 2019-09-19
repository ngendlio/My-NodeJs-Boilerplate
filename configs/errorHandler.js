const PARSING_ERROR = 'entity.parse.failed';
const logger = require('./logging');
logger.info(' ✓ Error handling configured ');

module.exports = app => {
  app.use((error, req, res, next) => {
    if (error.type == PARSING_ERROR) return res.status(400).send('INVALID_JSON');

    return next();
  });
};
