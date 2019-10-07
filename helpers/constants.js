const { enumsOf } = require('./index');

/**
 * This file contains all the enums or and the constants of the code.
 */
module.exports = {
  PASSWORD_MAX_ATTEMPTS: 3,

  REDIS_AUTH_PREFIX: 'auth:',

  GENDER_TYPES: enumsOf(['MALE', 'FEMALE']),

  META_INFO: { timestamps: true, versionKey: false },

  USER_STATUS: enumsOf(['PENDING', 'APPROVED', 'ACTIVE', 'LOCKED']),

  USER_TYPES: enumsOf(['ADMIN', 'AGENT', 'CUSTOMER']),

  JWT_ALGORITHM: 'HS384'
};
