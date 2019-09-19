const passport = require('passport'),
  User = require('../models/User'),
  logger = require('../configs/logging');
const { GENDER_TYPES, USER_STATUS, USER_TYPES } = require('../helpers/constants');
const { MALE, FEMALE } = GENDER_TYPES;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.send(usersw);
  } catch (error) {
    logger.issue(error, res);
  }
};

exports.createUser = async (req, res) => {
  /** Always validate the input from outside */
  req.assert('firstName', ' The first name is required').notEmpty();
  req.assert('lastName', ' The first name is required ').notEmpty();
  req.assert('nationalId', 'A valid national id is required').isNationalId();
  req.assert('phoneNumber', 'A valid Rwandan phone is required ').isRwandanPhone();
  req.assert('email', ' A valid email is required ').notEmpty();
  req.assert('gender', 'Gender only accepts MALE or FEMALE').isIn([MALE, FEMALE]);
  req
    .assert(
      'password',
      ' The password should to have minimum 8 characters, at least on digit, at least one Uppercase letter, at least one symbol '
    )
    .isStrongPassword();

  if (req.validationErrors()) return res.status(400).send(req.validationErrors()[0]);

  try {
    const userExists = await User.findOne({
      $or: [
        { email: req.body.email },
        { nationalId: req.body.nationalId },
        { phoneNumber: req.body.phoneNumber }
      ]
    });

    if (userExists)
      return res.status(400).send({
        msg:
          userExists.email == req.body.email
            ? 'EMAIL_ALREADY_REGISTERED'
            : userExists.nationalId == req.body.nationalId
            ? 'NATIONAL_ID_ALREADY_REGISTERED'
            : userExists.phoneNumber == req.body.phoneNumber
            ? 'MOBILE_PHONE_ALREADY_REGISTERED'
            : ''
      });

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationalId: req.body.nationalId,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      gender: req.body.gender,
      password: req.body.password,
      status: USER_STATUS.PENDING,
      type: USER_TYPES.CUSTOMER
    });

    await newUser.save();

    return res.end();
  } catch (error) {
    logger.issue(error, res);
  }
};
exports.updateUser = async (req, res) => {
  /** Always validate the input from outside */
  req.assert('userId', ' The user id is invalid').isMongoId();

  if (req.body.firstName)
    req.assert('firstName', ' The first name is invalid').notEmpty();
  if (req.body.lastName) req.assert('lastName', ' The first name is invalid ').notEmpty();
  if (req.body.nationalId)
    req.assert('nationalId', 'A valid national id is invalid').isNationalId();
  if (req.body.phoneNumber)
    req.assert('phoneNumber', 'A valid Rwandan phone is invalid ').isRwandanPhone();
  if (req.body.email) req.assert('email', ' A valid email is invalid ').notEmpty();
  if (req.body.gender)
    req.assert('gender', 'Gender can only be MALE or FEMALE').isIn([MALE, FEMALE]);
  if (req.body.password)
    req
      .assert(
        'password',
        ' The password should to have minimum 8 characters, at least on digit, at least one Uppercase letter, at least one symbol '
      )
      .isStrongPassword();

  try {
    const { userId } = req.params;

    const userExists = await User.findById(userId);

    if (!userExists) return res.status(404).send();

    if (req.body.firstName) userExists.firstName = req.body.firstName;
    if (req.body.lastName) userExists.lastName = req.body.lastName;

    // Should do validation for these 3
    if (req.body.nationalId) userExists.nationalId = req.body.nationalId;
    if (req.body.phoneNumber) userExists.phoneNumber = req.body.phoneNumber;
    if (req.body.email) userExists.email = req.body.email;

    if (req.body.gender) userExists.gender = req.body.gender;
    if (req.body.password) userExists.password = req.body.password;

    await userExists.save();

    return res.end();
  } catch (error) {
    logger.issue(error, res);
  }
};

exports.deleteUser = (req, res) => res.end();
