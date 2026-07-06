const Product = require('../models/Product');
const Service = require('../models/Service');

// @GET /api/search?q=keyword&type=product|service|all
const globalSearch = async (req, res, next) => {
  try {
    const { q, type = 'all', page = 1, limit = 10 } = req.query;

    if (!q) return res.status(400).json({ success: false, message: 'Search query required' });

    const skip = (page - 1) * limit;
    const textFilter = { $text: { $search: q }, status: 'active' };

    let products = [], services = [];

    if (type === 'all' || type === 'product') {
      products = await Product.find(textFilter)
        .populate('seller', 'name avatar')
        .skip(skip).limit(parseInt(limit));
    }

    if (type === 'all' || type === 'service') {
      services = await Service.find(textFilter)
        .populate('provider', 'name avatar')
        .skip(skip).limit(parseInt(limit));
    }

    res.json({ success: true, results: { products, services }, query: q });
  } catch (error) {
    next(error);
  }
};

module.exports = { globalSearch };