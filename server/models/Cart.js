/* 
Modelo Carrito de compras
Versión 1
Representa el carrito como tal, puede pertenecer a un usuario (opcional)
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true // puede estar vacío si el usuario no está registrado
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Cart;
