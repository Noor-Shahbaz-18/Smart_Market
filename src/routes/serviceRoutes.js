const express = require('express');
const router = express.Router();
const {
  getServices, getService, createService, updateService, deleteService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const { isOwner } = require('../middleware/roleCheck');
const upload = require('../middleware/upload');
const Service = require('../models/Service');

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', protect, upload.array('portfolioImages', 5), createService);
router.put('/:id', protect, isOwner(Service), upload.array('portfolioImages', 5), updateService);
router.delete('/:id', protect, isOwner(Service), deleteService);

module.exports = router;