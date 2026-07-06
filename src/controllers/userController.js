const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');
const Review = require('../models/Review');
const { deleteFromCloudinary } = require('../utils/cloudinaryUpload');

// @GET /api/users/:id
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -resetPasswordToken -resetPasswordExpire');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const products = await Product.find({ seller: user._id, status: 'active' }).limit(6);
    const services = await Service.find({ provider: user._id, status: 'active' }).limit(6);
    const reviews = await Review.find({ targetId: user._id, targetType: 'user' })
      .populate('reviewer', 'name avatar')
      .limit(5);

    res.json({ success: true, user, products, services, reviews });
  } catch (error) {
    next(error);
  }
};

// @PUT /api/users/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, phone, location, skills } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (skills) user.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());

    if (req.file) {
      if (user.avatar) await deleteFromCloudinary(user.avatar);
      user.avatar = req.file.path;
    }

    await user.save();
    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    next(error);
  }
};

// @PUT /api/users/change-password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'Current password incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

// @GET /api/users/my-listings
const getMyListings = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    const services = await Service.find({ provider: req.user._id });
    res.json({ success: true, products, services });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateProfile, changePassword, getMyListings };