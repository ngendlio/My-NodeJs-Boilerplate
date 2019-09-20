const mongoose = require('mongoose');
const config = require('../configs/index');
const logger = require('../configs/logging');

mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('open', () => logger.info(' ✓ Connexion to Mongo DB Successful !! ')).on(
  'error',
  err => {
    logger.issue(err);
    process.exit(1);
  }
);
