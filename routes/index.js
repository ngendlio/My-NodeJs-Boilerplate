const user = require('../controllers/user');
const session = require('../controllers/session');
const logger = require('../configs/logging');
logger.info(' ✓ Routes configured ');

const { isAuthenticated, isForAdmin } = require('../helpers/middlewares');

module.exports = app => {
  app.use((req, res, next) => {
    return next();
  });
  app
    .get('/users', isAuthenticated, user.getUsers)
    .post('/users', user.createUser)
    .patch('/users/:userId', user.updateUser)
    .delete('/users/:userId', isForAdmin, user.deleteUser);

  app.post('/session', session.login);

  app.all('*', (req, res) => res.status(404).send('Page not found bro'));
};
