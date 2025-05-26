/*
Versión 1 del 25
Modelo de Producto, nos ayudará a:
    concentrar la info que se mostrará en el frot bien organizada y accesible
    Al filtro de busqueda posteriormente
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nombre del producto (cerveza, etc.)'
  },
  description: {
    type: DataTypes.TEXT,
    comment: 'Descripción larga del producto'
  },
  imageUrl: {
    type: DataTypes.STRING,
    comment: 'URL de la imagen del producto'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Ejemplo: cerveza, nacional, importada, etc.'
  },
  country: {
    type: DataTypes.STRING,
    comment: 'País de origen'
  },
  capacityML: {
    type: DataTypes.INTEGER,
    comment: 'Capacidad en mililitros (ml)'
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Precio en pesos mexicanos'
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Cantidad disponible en inventario'
  }
});

module.exports = Product;