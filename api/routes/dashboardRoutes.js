// Dashboard routes for stats and real-time updates
const express = require('express');
const {
  getDashboardStats,
  getRealTimeUpdates,
} = require('../controllers/dashboardController');
// const { isAuthenticated, authorizeRoles } = require("../middleware/auth"); // Temporarily commented out

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/realtime', getRealTimeUpdates);

module.exports = router;
