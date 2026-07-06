const Favorite = require('../models/Favorite');

// @POST /api/favorites
const addFavorite = async (req, res, next) => {
  try {
    const { targetType, targetId } = req.body;

    const existing = await Favorite.findOne({ user: req.user._id, targetId });
    if (existing) return res.status(400).json({ success: false, message: 'Already in favorites' });

    const favorite = await Favorite.create({ user: req.user._id, targetType, targetId });
    res.status(201).json({ success: true, favorite });
  } catch (error) {
    next(error);
  }
};

// @DELETE /api/favorites/:targetId
const removeFavorite = async (req, res, next) => {
  try {
    await Favorite.findOneAndDelete({ user: req.user._id, targetId: req.params.targetId });
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    next(error);
  }
};

// @GET /api/favorites
const getMyFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id });
    res.json({ success: true, favorites });
  } catch (error) {
    next(error);
  }
};

module.exports = { addFavorite, removeFavorite, getMyFavorites };