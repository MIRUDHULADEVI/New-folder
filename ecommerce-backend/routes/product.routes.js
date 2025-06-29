const express = require('express');
const router = express.Router();

// ✅ Import controller functions
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,    // <-- this line is crucial
  deleteProduct,
} = require('../controllers/product.controller');


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.patch('/:id', updateProduct); // ✅ This will now work
router.delete('/:id', deleteProduct);
// product.routes.js

router.get('/product-prices', async (req, res) => {
  try {
    const products = await Product.find({}, 'id price originalPrice');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});


module.exports = router;


// controllers/product.controller.js




