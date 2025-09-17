// Visitor routes for adding a visitor and getting visitor count
const express = require('express');
const {
  addVisitor,
  getVisitorCount,
} = require('../controllers/visitorController');

const router = express.Router();

router.post('/add', addVisitor);
router.get('/count', getVisitorCount);

module.exports = router;
