/* Para incializar el servidor
Versión 1
24-05-25
FMV
 */
require('dotenv').config(); // carga variables de entorno
const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./config/passport');

const app = express();
app.use(cors());
app.use(express.json()); //esto sirve para que se puedan leer los json 
app.use(passport.initialize());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos 🎉');
    return sequelize.sync(); // sólo aquí
  })
  .then(() => console.log('Modelos sincronizados 🧩')) //para verificar que si se sincronizarón
  .catch(err => console.error('Error de conexión a la base de datos ❌', err)); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

console.log('Usuario DB:', process.env.DB_USER);




