const express = require('express');
const router = express.Router();
const {
  createBooking, getMyBookings, getBooking, updateBookingStatus
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.patch('/:id/status', protect, updateBookingStatus);

module.exports = router;