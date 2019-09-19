const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const SALT_ROUNDS = 10; //(rounds=10: ~10 hashes/sec) [https://goo.gl/aK7A0t]
const Schema = mongoose.Schema;
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

UserSchema.pre('save', async next => {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(this.password + user._id, salt);
    user.password = hash;
  }

  next();
});

// Here we are protected agains dictionary attack
UserSchema.methods.comparePassword = (candidatePassword, user, cb) => {
  bcrypt.compare(candidatePassword + user._id, user.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
