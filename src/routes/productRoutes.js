const express = require('express');
const router = express.Router();
const {
  getProducts, getProduct, createProduct, updateProduct, deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { isOwner } = require('../middleware/roleCheck');
const upload = require('../middleware/upload');
const Product = require('../models/Product');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, upload.array('images', 5), createProduct);
router.put('/:id', protect, isOwner(Product), upload.array('images', 5), updateProduct);
router.delete('/:id', protect, isOwner(Product), deleteProduct);

module.exports = router;