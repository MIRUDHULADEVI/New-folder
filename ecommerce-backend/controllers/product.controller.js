const Product = require('../models/product.model'); // ✅ Ensure this is at the top

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const product = new Product({ name, price, description, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, stock } = req.body;

  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl, stock },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// ✅ Correct export!
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
