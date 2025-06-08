/* Version 1
Lo siguiente es para configurarr las rutas y que funcione nuestro CRUD en postman */
const express = require('express');
const router = express.Router();
const { Cart, CartItem, Product} = require('../models');
//const {User} = require('../models/User');

// ✅ 1. Obtener el carrito de un usuario (registrado)
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.params.userId },
      include: {
        model: CartItem,
        include: [Product]
      }
    });

    if (!cart) return res.status(404).json({ msg: 'Carrito no encontrado' });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// ✅ 2. Agregar producto al carrito
router.post('/', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Verifica que vengan los datos
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: 'Faltan datos necesarios' });
    }

    // Buscar o crear carrito
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Agregar producto al carrito
    const item = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity
    });

    res.status(201).json(item);
  } catch (error) {
    console.error('❌ Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


// ✅ 3. Eliminar producto del carrito
router.delete('/:cartItemId', async (req, res) => {
  try {
    const deleted = await CartItem.destroy({ where: { id: req.params.cartItemId } });

    if (!deleted) return res.status(404).json({ msg: 'Producto no encontrado en carrito' });

    res.json({ msg: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar del carrito' });
  }
});

// ✅ 4. Actualizar cantidad de un producto en el carrito
router.put('/update/:cartItemId', async (req, res) => {
  const { quantity } = req.body;

  try {
    const item = await CartItem.findByPk(req.params.cartItemId);

    if (!item) return res.status(404).json({ msg: 'Producto no encontrado en carrito' });

    item.quantity = quantity;
    await item.save();

    res.json({ msg: 'Cantidad actualizada', item });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cantidad' });
  }
});

module.exports = router;
