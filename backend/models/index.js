// models/index.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectOptions: {
    ssl: false, // Puedes configurar esto según tus necesidades
  },
  ...require('../config/config.json')['development']
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);  // Modelo existente
db.Car = require('./car')(sequelize, Sequelize);    // Nuevo modelo de carros

module.exports = db;
