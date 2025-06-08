/*
Version 1 
Representa cada producto en el carrito */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

const Cart = require('./Cart');

// Relaciones
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = CartItem;
