const express = require('express');
const router = express.Router();
const businessController = require('../../controllers/businessController');

// Public Business endpoints
router.get('/getBusinessInfo/:username', businessController.getBusinessInfo);
router.get('/getEvents/:username', businessController.getEvents);
router.get('/countEvents/:username', businessController.countEvents);
router.get('/getBusinessImage/:username', businessController.getBusinessImage);
router.get('/getEventImage/:event_uuid', businessController.getEventImage);

module.exports = router;
