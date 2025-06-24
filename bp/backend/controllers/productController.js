
const { Product,Category } = require('../models');
const path = require('path');

// CREATE Product with category
exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      categoryId: category
    });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Error adding product', error: err.message });
  }
};

// GET All Products with category name included
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['name']
        }
      ]
    });

    const formatted = products.map(p => ({
      ...p.toJSON(),
      categoryName: p.Category?.name || 'Uncategorized'
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProduct = await Product.findByPk(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Prepare updated fields safely
    const updatedProduct = {
      name: req.body.name?.trim() ? req.body.name : existingProduct.name,
      description: req.body.description?.trim() ? req.body.description : existingProduct.description,
      price: req.body.price !== undefined && req.body.price !== '' ? req.body.price : existingProduct.price,
      stock: req.body.stock !== undefined && req.body.stock !== '' ? req.body.stock : existingProduct.stock,
      categoryId: req.body.category ? req.body.category : existingProduct.categoryId,
      image: req.file ? `/uploads/${req.file.filename}` : existingProduct.image
    };

    await Product.update(updatedProduct, { where: { id } });

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

// DELETE Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};
