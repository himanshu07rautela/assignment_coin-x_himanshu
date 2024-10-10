const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const { getDeviation } = require('../controllers/deviationController');

// Task 2: /stats API
router.get('/stats', getStats);

// Task 3: /deviation API
router.get('/deviation', getDeviation);

module.exports = router;