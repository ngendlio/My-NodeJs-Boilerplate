const cron = require('node-cron');

const EVERY_NIGHT_1AM = '0 1 * * * ';

/**
 * This file will contain all the schedule jobs for your applications.
 * Example: Running back-ups or any other task that you want.
 */
exports.executeScheduledJobs = () => {
  cron.schedule(EVERY_NIGHT_1AM, () => {
    console.log('Executing a task again..... ');
  });
};
