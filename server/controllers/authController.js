/* 
Versión 1
El controlador de autenticación  
*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    console.log('REQ.BODY:', req.body); // 👈 Esto ayuda a debuguear y verifica si llega al backend
  const { email, password, name } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email ya registrado' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    //Cambié res.json({ user, token }) por lo siguiente para que no se muestre la contraseña únicamente
    //res.json({ user, token });
    const { password, ...userData } = user.toJSON();
    res.json({ user: userData, token });

  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};