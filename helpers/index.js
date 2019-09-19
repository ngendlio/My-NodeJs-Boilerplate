/**
 * This file will contain all the helper functions for your app.
 * In few words, functions used in multiple places in the code should be here bro.
 */

exports.getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Makes your life easy to generate enums in javascript
 */
exports.toEnums = arrayOfStrings => {
  if (!Array.isArray(arrayOfStrings)) throw new Error('Invalid array');

  let newArray = {};

  arrayOfStrings.map(key => (newArray[key] = key));

  return newArray;
};
