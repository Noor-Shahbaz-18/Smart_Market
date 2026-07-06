const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Report = require('../models/Report');
const Notification = require('../models/Notification');
const { getIO } = require('../config/socket');

// @GET /api/admin/stats
const getPlatformStats = async (req, res, next) => {
  try {
    const [users, products, services, bookings] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Service.countDocuments(),
      Booking.countDocuments(),
    ]);

    const pendingProducts = await Product.countDocuments({ status: 'pending' });
    const pendingServices = await Service.countDocuments({ status: 'pending' });

    res.json({ success: true, stats: { users, products, services, bookings, pendingProducts, pendingServices } });
  } catch (error) {
    next(error);
  }
};

// @GET /api/admin/users
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const filter = {};
    if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];

    const skip = (page - 1) * limit;
    const users = await User.find(filter).select('-password').skip(skip).limit(parseInt(limit)).sort('-createdAt');
    const total = await User.countDocuments(filter);

    res.json({ success: true, users, total });
  } catch (error) {
    next(error);
  }
};

// @PATCH /api/admin/users/:id/suspend
const toggleSuspend = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.isSuspended = !user.isSuspended;
    await user.save();

    res.json({ success: true, message: `User ${user.isSuspended ? 'suspended' : 'unsuspended'}` });
  } catch (error) {
    next(error);
  }
};

// @GET /api/admin/listings/pending
const getPendingListings = async (req, res, next) => {
  try {
    const products = await Product.find({ status: 'pending' }).populate('seller', 'name email');
    const services = await Service.find({ status: 'pending' }).populate('provider', 'name email');
    res.json({ success: true, products, services });
  } catch (error) {
    next(error);
  }
};

// @PATCH /api/admin/listings/:type/:id/approve
const approveListing = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const { action } = req.body; // 'approve' or 'reject'
    const status = action === 'approve' ? 'active' : 'rejected';

    const Model = type === 'product' ? Product : Service;
    const listing = await Model.findByIdAndUpdate(id, { status }, { new: true });

    if (!listing) return res.status(404).json({ success: false, message: 'Listing not found' });

    const ownerId = listing.seller || listing.provider;
    const notification = await Notification.create({
      recipient: ownerId,
      type: 'listing_approval',
      message: `Your ${type} listing "${listing.title}" has been ${status}`,
      link: `/${type}s/${listing._id}`,
    });

    getIO().to(ownerId.toString()).emit('notification', notification);

    res.json({ success: true, message: `Listing ${status}`, listing });
  } catch (error) {
    next(error);
  }
};

// @GET /api/admin/reports
const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ status: 'pending' })
      .populate('reporter', 'name email')
      .sort('-createdAt');
    res.json({ success: true, reports });
  } catch (error) {
    next(error);
  }
};

// @PATCH /api/admin/reports/:id
const updateReport = async (req, res, next) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, report });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPlatformStats, getAllUsers, toggleSuspend, getPendingListings, approveListing, getReports, updateReport };