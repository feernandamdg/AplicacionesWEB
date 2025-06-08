/* Para incializar el servidor
Versión 1
24-05-25
FMV
Este es el archivo principal que arranca tu servidor, conecta a la base de datos, levanta Express, 
carga rutas, etc.
 */
require('dotenv').config(); // carga variables de entorno
const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./config/passport');

const app = express();
app.use(cors());
app.use(express.json()); //esto sirve para que se puedan leer los json 
app.use(passport.initialize()); //aqui se importa la BD productos para que sequelize.sync lo registre

/* Rutas para auth*/
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

//Rutas del Producto BD 
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes); // 👈 Monta las rutas de producto

//Para que funcione carrito 
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

const sequelize = require('./config/database');
/* Lineas donde se importan las bases de datos de los elementos */
require('./models/Product'); 
require('./models/Cart'); 
require('./models/CartItem');

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