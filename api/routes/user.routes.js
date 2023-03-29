const handler = require('../controller/user.handler');

module.exports = (router) => {
  router.get('/', handler.getUser);
  router.post('/register', handler.register);
  router.post('/login', handler.login);

  return router;
};
