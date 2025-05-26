
/*Versión 1
A continuación el modelo sql de el usuario en el cual se verifica si es administradors */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  googleId: { type: DataTypes.STRING }, // solo si se loguea con Google
});

module.exports = User;