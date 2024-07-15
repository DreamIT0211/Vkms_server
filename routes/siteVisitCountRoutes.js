// routes/siteVisitCountRoutes.js

const express = require('express');
const router = express.Router();
const siteVisitCountController = require('../controllers/siteVisitCountController');

router.get('/', siteVisitCountController.getVisitCount);
router.post('/increment', siteVisitCountController.incrementVisitCount);

module.exports = router;
