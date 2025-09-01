const express = require('express');
const router = express.Router();
const interactionController = require('../../controllers/interactionController');

// Public Interaction endpoints
router.get('/searchProfile/:query', interactionController.searchProfile);
router.get('/getBusinessLikeCount/:business_username', interactionController.getBusinessLikeCount);
router.post('/getBusinessLikeCheck', interactionController.getBusinessLikeCheck);
router.get('/getEventLikeCount/:event', interactionController.getEventLikeCount);
router.post('/getEventLikeCheck', interactionController.getEventLikeCheck);
router.post('/getFolderInfo', interactionController.getFolderInfo);
router.get('/getAccountReviews/:username', interactionController.getAccountReviews);
router.get('/getBusinessReviews/:business_username', interactionController.getBusinessReviews);
router.get('/getEventInfo/:event', interactionController.getEventInfo);
router.get('/getReviewImage/:review_uuid', interactionController.getReviewImage);

module.exports = router;
