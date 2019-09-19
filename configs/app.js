const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./index');
const hours = 60 * 60 * 1000;
const logger = require('./logging');
logger.info(' ✓ Application configured ');

module.exports = app => {
  app
    .use(bodyParser.json({}))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(
      express.static(path.join(__dirname, 'public'), {
        maxAge: config.isDev ? 0 : 2 * hours
      })
    )
    .use(
      expressValidator({
        customValidators: {
          isNationalId: val => /^\d{16}$/.test(val),
          isCanadianPlateNumber: val => /^C[A-Z]{2}[0-9]{3}[A-Za-z]$/.test(val),
          isRwandanPhone: val => /^2507[2,3,8]\d{7}$/.test(val),
          isStrongPassword: password =>
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(
              password
            )
        }
      })
    );
};
