const Product = require('../models/Product');

// Crear producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar producto' });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Producto actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
