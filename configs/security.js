const helmet = require('helmet'), //useful security-headers
  contentLength = require('express-content-length-validator');

const logger = require('./logging');
logger.info(' ✓ Security configured');
//Here you can spoof any back end
const SPOOFED_SERVER = 'Phusion Passenger (mod_rails/mod_rack) 3.0.11';

module.exports = app => {
  app
    .use(contentLength.validateMax({ status: 413, message: 'Payload Too Large' }))
    .use(helmet())
    .use(helmet.noSniff())
    .use(helmet.frameguard({ action: 'deny' }))
    .use(helmet.xssFilter())
    .use(helmet.hidePoweredBy({ setTo: SPOOFED_SERVER }))
    .use(helmet.dnsPrefetchControl({ allow: false }));
};
