const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //active pool option at db.config
  //   pool: {
  //     max: dbConfig.pool.max,
  //     min: dbConfig.pool.min,
  //     acquire: dbConfig.pool.acquire,
  //     idle: dbConfig.pool.idle,
  //   },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.collection = require("./collection.model.js")(sequelize, Sequelize);
db.result = require("./result.model.js")(sequelize, Sequelize);

module.exports = db;
