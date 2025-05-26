/*Version 1
es la configuracion de mi database que requiere /models/User.js
*/ 
const { Sequelize } = require('sequelize'); //Aquí ya estoy implementando mi ORM 

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'tu_contraseña',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, // Cambia a true si quieres ver las queries
  }
);

module.exports = sequelize;