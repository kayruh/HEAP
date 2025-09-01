const express = require('express');
const multer = require('multer');
const router = express.Router();
const businessController = require('../../controllers/businessController');
const { requireAuthUsername } = require('../../middleware/auth');

const upload = multer();

// Secure Business endpoints
router.put('/upsertEvent', requireAuthUsername, businessController.upsertEvent);
router.delete('/deleteEvent', requireAuthUsername, businessController.deleteEvent);
router.post('/uploadBusinessImage', requireAuthUsername, upload.single('file'), businessController.uploadBusinessImage);
router.delete('/deleteBusinessImage', requireAuthUsername, businessController.deleteBusinessImage);
router.post('/uploadEventImage/:event_uuid', requireAuthUsername, upload.single('file'), businessController.uploadEventImage);
router.delete('/deleteEventImage/:event_uuid', requireAuthUsername, businessController.deleteEventImage);

module.exports = router;
