const { toEnums } = require('./index');

/**
 * This file contains all the enums or and the constants of the code.
 */
module.exports = {
  PASSWORD_MAX_ATTEMPTS: 3,

  REDIS_AUTH_PREFIX: 'AUTH_',

  GENDER_TYPES: toEnums(['MALE', 'FEMALE']),

  META_INFO: { timestamps: true, versionKey: false },

  USER_STATUS: toEnums(['PENDING', 'APPROVED', 'ACTIVE', 'LOCKED']),

  USER_TYPES: toEnums(['ADMIN', 'AGENT', 'CUSTOMER'])
};
