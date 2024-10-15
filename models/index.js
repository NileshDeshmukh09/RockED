const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT,
    }
  );



const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("../models/User")(sequelize, Sequelize);
db.Certificate = require("../models/Certificate")(sequelize, Sequelize);

// db.User.hasMany(db.Certificate, { foreignKey: "userId" });
db.Certificate.hasMany(db.User, { foreignKey: "userId" });

module.exports = db;   