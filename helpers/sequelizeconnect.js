const { Sequelize } = require("sequelize");
const config = require("../config");
const { host, port, user, password, database } = config.db;
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});
module.exports = sequelize;
