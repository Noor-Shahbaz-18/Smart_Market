const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile, changePassword, getMyListings } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/my-listings', protect, getMyListings);
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.put('/change-password', protect, changePassword);
router.get('/:id', getUserProfile);

module.exports = router;