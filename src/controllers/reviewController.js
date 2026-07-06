const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');

const updateTargetRating = async (targetType, targetId) => {
  const reviews = await Review.find({ targetId, targetType });
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const count = reviews.length;

  if (targetType === 'user') await User.findByIdAndUpdate(targetId, { 'ratings.average': average.toFixed(1), 'ratings.count': count });
  if (targetType === 'service') await Service.findByIdAndUpdate(targetId, { 'ratings.average': average.toFixed(1), 'ratings.count': count });
};

// @POST /api/reviews
const createReview = async (req, res, next) => {
  try {
    const { targetType, targetId, rating, comment } = req.body;

    const existing = await Review.findOne({ reviewer: req.user._id, targetId, targetType });
    if (existing) return res.status(400).json({ success: false, message: 'Already reviewed' });

    const review = await Review.create({
      reviewer: req.user._id,
      targetType, targetId, rating, comment,
    });

    await updateTargetRating(targetType, targetId);
    await review.populate('reviewer', 'name avatar');

    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

// @GET /api/reviews/:targetType/:targetId
const getReviews = async (req, res, next) => {
  try {
    const { targetType, targetId } = req.params;
    const reviews = await Review.find({ targetType, targetId })
      .populate('reviewer', 'name avatar')
      .sort('-createdAt');

    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

// @DELETE /api/reviews/:id
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    if (review.reviewer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { targetType, targetId } = review;
    await review.deleteOne();
    await updateTargetRating(targetType, targetId);

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};

// @PATCH /api/reviews/:id/report
const reportReview = async (req, res, next) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, { isReported: true });
    res.json({ success: true, message: 'Review reported' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createReview, getReviews, deleteReview, reportReview };