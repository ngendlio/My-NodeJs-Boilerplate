// The Redis client
const redis = require('redis');
const config = require('../configs');
const logger = require('../configs/logging');
const { promisify } = require('util');
const HOURS_24 = 60 * 60 * 24;

const { REDIS_AUTH_PREFIX: PREFIX } = require('../helpers/constants');

const client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST, {
  password: config.REDIS_SECRET
});

client.select(config.REDIS_DATABASE_NUMBER);

client
  .on('connect', () => logger.info(' ✓ Connexion to Redis DB successful'))
  .on('error', error => {
    logger.issue({ error }, 'Unable to connect to Redis !!');
    process.exit(1);
  });

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

const setKey = async (hashKey, data, expirationTime = HOURS_24) =>
  await setAsync(PREFIX + hashKey, data, 'EX', expirationTime);

const getKey = async hashKey => await getAsync(PREFIX + hashKey);
const delKey = async hashKey => await delAsync(PREFIX + hashKey);

module.exports = { setKey, getKey, delKey, client };
