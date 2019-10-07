require('dotenv').config();
console.log(' ✓ Environment variables configured ');

const {
  PORT = 3000,
  MONGO_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  PASSWORD_SALT,
  PASSWORD_SALT_ROUNDS,
  SESSION_SECRET,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_SECRET,
  REDIS_TTL,
  REDIS_PREFIX,
  REDIS_NAME,
  REDIS_DATABASE_NUMBER,
  SLACK_WEB_HOOK_URL,
  NODE_ENV
} = process.env; // we are filtering which env vars we extract from the OS

module.exports = {
  APP_NAME: 'boilerplate-code',
  PORT,
  isDev: NODE_ENV !== 'production',
  MONGO_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  PASSWORD_SALT,
  PASSWORD_SALT_ROUNDS: Number(PASSWORD_SALT_ROUNDS),
  SESSION_SECRET,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_SECRET,
  REDIS_TTL,
  REDIS_PREFIX,
  REDIS_NAME,
  REDIS_DATABASE_NUMBER,
  SLACK_WEB_HOOK_URL
};
