const Sequelize = require('sequelize');
const { env } = require('../utility/config');

const sequelize = new Sequelize(env('DATABASE_URL'));
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.checklist = require('./checklist.model')(sequelize, Sequelize);
db.checklistItem = require('./checklistItem.model')(sequelize, Sequelize);

module.exports = db;
