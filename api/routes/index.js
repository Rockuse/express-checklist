const user = require('./user.routes');
const checklist = require('./checklist.routes');
const { getImage } = require('../controller/image.handler');

module.exports = (app, express) => {
  app.get('/api', (req, res) => { res.json('Hello World'); });
  app.get('/api/Images/profile/:img', getImage);
  app.use('/api/user', user(express.Router()));
  app.use('/api/checklist', checklist(express.Router()));
  return app;
};
