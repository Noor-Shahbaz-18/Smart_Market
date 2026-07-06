const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};

const isOwner = (model) => async (req, res, next) => {
  try {
    const doc = await model.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    const ownerId = doc.seller || doc.provider || doc.user;
    if (ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    req.doc = doc;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { isAdmin, isOwner };