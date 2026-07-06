const express = require('express');
const router = express.Router();
const { createReview, getReviews, deleteReview, reportReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createReview);
router.get('/:targetType/:targetId', getReviews);
router.delete('/:id', protect, deleteReview);
router.patch('/:id/report', protect, reportReview);

module.exports = router;