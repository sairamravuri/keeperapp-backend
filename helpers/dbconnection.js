module.exports = db = {};

initialize();

async function initialize() {
  const sequelize = require("../helpers/sequelizeconnect");
  db.login = require("../model/login.model")(sequelize);
  db.notes = require("../model/notes.model")(sequelize);
  // init models and add them to the exported db object

  // sync all models with database
  await sequelize.sync({ alter: true }); //{alter:true}
}
