const Service = require('../models/Service');
const { deleteFromCloudinary } = require('../utils/cloudinaryUpload');
const { paginate, paginateResponse } = require('../utils/pagination');
const { buildServiceFilter } = require('../utils/filterHelpers');

// @GET /api/services
const getServices = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', search } = req.query;
    const filter = buildServiceFilter(req.query);

    if (search) filter.$text = { $search: search };

    const { skip } = paginate(req.query, page, limit);
    const total = await Service.countDocuments(filter);
    const services = await Service.find(filter)
      .populate('provider', 'name avatar location ratings')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ success: true, ...paginateResponse(services, total, page, limit) });
  } catch (error) {
    next(error);
  }
};

// @GET /api/services/:id
const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'name avatar location ratings bio phone');

    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

// @POST /api/services
const createService = async (req, res, next) => {
  try {
    const { title, description, category, price, deliveryTime, tags } = req.body;
    const portfolioImages = req.files ? req.files.map((f) => f.path) : [];

    const service = await Service.create({
      title, description, category, price,
      deliveryTime, portfolioImages,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      provider: req.user._id,
    });
    res.status(201).json({ success: true, message: 'Service created, pending approval', service });
  } catch (error) {
    next(error);
  }
};

// @PUT /api/services/:id
const updateService = async (req, res, next) => {
  try {
    const service = req.doc;
    const { title, description, category, price, deliveryTime, availability, tags } = req.body;

    if (title) service.title = title;
    if (description) service.description = description;
    if (category) service.category = category;
    if (price) service.price = price;
    if (deliveryTime) service.deliveryTime = deliveryTime;
    if (availability !== undefined) service.availability = availability;
    if (tags) service.tags = tags.split(',').map(t => t.trim());

    if (req.files && req.files.length > 0) {
      for (const img of service.portfolioImages) await deleteFromCloudinary(img);
      service.portfolioImages = req.files.map((f) => f.path);
    }

    await service.save();
    res.json({ success: true, message: 'Service updated', service });
  } catch (error) {
    next(error);
  }
};

// @DELETE /api/services/:id
const deleteService = async (req, res, next) => {
  try {
    const service = req.doc;
    for (const img of service.portfolioImages) await deleteFromCloudinary(img);
    await service.deleteOne();
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServices, getService, createService, updateService, deleteService };