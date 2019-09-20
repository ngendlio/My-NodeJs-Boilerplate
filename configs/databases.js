const logger = require('../configs/logging');

logger.info(' ✓ Database configured ');

require('../integrations/mongo');
require('../integrations/redis');
