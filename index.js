const http = require('http');
const app = require('./api');
const { env } = require('./api/utility/config');
const { dbsync } = require('./api/utility/db');

const server = http.createServer(app);

const PORT = env('PORT') || 3030;
const init = async () => {
  try {
    await dbsync();
    server.listen(PORT, () => {
      console.log(`Connected to ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
