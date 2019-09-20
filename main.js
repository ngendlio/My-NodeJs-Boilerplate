const express = require('express');
const app = express();
const config = require('./configs');
const logger = require('./configs/logging');

require('./configs/databases');

require('./configs/app')(app);

// require('./configs/session')(app);

require('./configs/auth').configureAuth(app);

require('./configs/security')(app);

require('./routes')(app);

require('./configs/errorHandler')(app);

app.listen(config.PORT, () =>
  logger.info(
    ' ✓ %s Server is running on port %d ',
    config.APP_NAME.toUpperCase(),
    config.PORT
  )
);

module.exports = app;
