const mongoose = require('mongoose');
const config = require('./index');
const logger = require('./logging');

logger.info(' ✓ Database configured ');

mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true }
);

const db = mongoose.connection;

db.on('open', () => {
  logger.info(' ✓ Connexion to Mongo DB Successfull !! ');
}).on('error', err => {
  logger.issue(err.message);

  process.exit(1);
});
