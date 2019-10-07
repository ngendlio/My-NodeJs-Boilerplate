const { PASSWORD_SALT, PASSWORD_SALT_ROUNDS } = require('../configs/index');

const logger = require('../configs/logging');
const bcrypt = require('bcrypt');

/**
 * This file will contain all the helper functions for your app.
 * In few words, functions used in multiple places in the code should be here bro.
 */

exports.getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Makes your life easy to generate enums in javascript
 */
exports.enumsOf = arrayOfStrings => {
  if (!Array.isArray(arrayOfStrings)) throw new Error('Invalid array');

  let newArray = {};

  arrayOfStrings.map(key => (newArray[key] = key));

  return newArray;
};

exports.hashPassword = async user => {
  const textToBeHashed = user.password + user._id + PASSWORD_SALT;

  try {
    const hash = await bcrypt.hash(textToBeHashed, PASSWORD_SALT_ROUNDS);

    return hash;
  } catch (error) {
    logger.issue(error);
  }
};

exports.checkPassword = async (providedPassword, user) => {
  const combo = providedPassword + user._id + PASSWORD_SALT;

  try {
    const isMatch = await bcrypt.compare(combo, user.password);

    return isMatch;
  } catch (error) {
    logger.issue(error);
  }
};
