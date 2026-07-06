const express = require('express');
const router = express.Router();
const {
  getPlatformStats, getAllUsers, toggleSuspend,
  getPendingListings, approveListing, getReports, updateReport
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

router.use(protect, isAdmin);

router.get('/stats', getPlatformStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/suspend', toggleSuspend);
router.get('/listings/pending', getPendingListings);
router.patch('/listings/:type/:id/approve', approveListing);
router.get('/reports', getReports);
router.patch('/reports/:id', updateReport);

module.exports = router;