const logger = require('../configs/logging');
const uuidv1 = require('uuid/v1');
const User = require('../models/User');
const redis = require('../integrations/redis');

exports.saveUserSession = async userId => {
  try {
    const token = uuidv1();

    let user = await User.findById(userId).lean();

    await redis.setKey(`${token}`, JSON.stringify(user));

    return token;
  } catch (error) {
    logger.issue('Failed to save new user session in redis ' + error.message);
    return;
  }
};
