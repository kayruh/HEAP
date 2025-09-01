const express = require('express');
const router = express.Router();
const appController = require('../../controllers/appController');

// Public App endpoints
router.get('/getWhatsHot', appController.getWhatsHot);
router.post('/getFilterEvent', appController.getOngoingEventsAndBusinesses);

module.exports = router;
