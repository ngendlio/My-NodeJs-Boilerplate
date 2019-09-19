const axios = require('axios');
const config = require('../configs');

const opts = { baseURL: config.SLACK_WEB_HOOK_URL, keepAlive: true };

const slackClient = axios.create(opts);

module.exports = slackClient;
