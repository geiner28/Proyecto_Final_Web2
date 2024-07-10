const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectOptions: {
    ssl: false  // Configura según tus necesidades
  },
  ...require('../config/config.json')['development']
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Carga de modelos
db.User = require('./user')(sequelize, Sequelize);  // Modelo existente
db.Car = require('./car')(sequelize, Sequelize);    // Modelo de carros
db.Order = require('./order')(sequelize, Sequelize); // Modelo de pedidos

// Asociaciones entre modelos si es necesario
db.Car.belongsToMany(db.Order, { through: 'OrderCar' });
db.Order.belongsToMany(db.Car, { through: 'OrderCar' });

module.exports = db;
