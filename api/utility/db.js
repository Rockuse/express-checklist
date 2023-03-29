const db = require('../model');

module.exports = {
  dbsync: async () => {
    await db.sequelize.sync({ force: false }).then(() => {
      console.log('Synced db.');
    })
      .catch((err) => {
        console.log(`Failed to sync db: ${err.message}`);
      });
  },
};
