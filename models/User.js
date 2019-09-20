const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword } = require('../helpers/index');
const logger = require('../configs/logging');
const {
  GENDER_TYPES,
  USER_STATUS,
  USER_TYPES,
  META_INFO
} = require('../helpers/constants');
const { ACTIVE, APPROVED, LOCKED, PENDING } = USER_STATUS;
const { ADMIN, AGENT, CUSTOMER } = USER_TYPES;
const { MALE, FEMALE } = GENDER_TYPES;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
      lowercase: true
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
      lowercase: true
    },
    nationalId: { type: String, sparse: true, index: true },
    phoneNumber: { type: String, match: /^2507[2,3,8]\d{7}/, required: false },
    email: {
      type: String,
      match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true
    },
    gender: { type: String, enum: [MALE, FEMALE], required: true, index: true },

    password: { type: String, select: false }, //password should not be sent to the front-end

    status: { type: String, required: true, enum: [ACTIVE, APPROVED, LOCKED, PENDING] },
    type: { type: String, required: true, enum: [ADMIN, AGENT, CUSTOMER] },

    lastLoginDate: { type: Date }
  },
  META_INFO
);

UserSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    const hash = await hashPassword(user);
    user.password = hash;
  }

  next();
});

module.exports = mongoose.model('User', UserSchema);
