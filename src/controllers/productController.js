const Product = require('../models/Product');
const { deleteFromCloudinary } = require('../utils/cloudinaryUpload');
const { paginate, paginateResponse } = require('../utils/pagination');
const { buildProductFilter } = require('../utils/filterHelpers');

// @GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', search } = req.query;
    const filter = buildProductFilter(req.query);

    if (search) filter.$text = { $search: search };

    const { skip } = paginate(req.query, page, limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('seller', 'name avatar location ratings')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ success: true, ...paginateResponse(products, total, page, limit) });
  } catch (error) {
    next(error);
  }
};

// @GET /api/products/:id
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name avatar location ratings bio phone');

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.views += 1;
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, category, location, condition } = req.body;
    const images = req.files ? req.files.map((f) => f.path) : [];

    const product = await Product.create({
      title, description, price, category,
      location, condition, images,
      seller: req.user._id,
    });
    res.status(201).json({ success: true, message: 'Product created, pending approval', product });
  } catch (error) {
    next(error);
  }
};

// @PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = req.doc;
    const { title, description, price, category, location, condition } = req.body;

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (location) product.location = location;
    if (condition) product.condition = condition;

    if (req.files && req.files.length > 0) {
      for (const img of product.images) await deleteFromCloudinary(img);
      product.images = req.files.map((f) => f.path);
    }

    await product.save();
    res.json({ success: true, message: 'Product updated', product });
  } catch (error) {
    next(error);
  }
};

// @DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = req.doc;
    for (const img of product.images) await deleteFromCloudinary(img);
    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };