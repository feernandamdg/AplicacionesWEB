/* 
Versión 1 
Rutas de autenticación con JWT 
*/
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport'); //se agregó en basé a config/passport.js

router.post('/register', authController.register);
router.post('/login', authController.login);

// se agregó en base a config/passport.js
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.redirect(`http://localhost:5173/login?token=${token}`); // frontend
  });
  
module.exports = router;