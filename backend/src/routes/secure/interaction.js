const express = require('express');
const multer = require('multer');
const router = express.Router();
const interactionController = require('../../controllers/interactionController');
const { requireAuthUsername } = require('../../middleware/auth');

const upload = multer();

// Secure Interaction endpoints
router.post('/insertLikeBusiness', requireAuthUsername, interactionController.insertLikeBusiness);
router.delete('/deleteLikeBusiness', requireAuthUsername, interactionController.deleteLikeBusiness);
router.post('/insertLikeEvent', requireAuthUsername, interactionController.insertLikeEvent);
router.delete('/deleteLikeEvent', requireAuthUsername, interactionController.deleteLikeEvent);

router.post('/insertFolder', requireAuthUsername, interactionController.insertFolder);
router.patch('/updateFolder', requireAuthUsername, interactionController.updateFolder);
router.delete('/deleteFolder', requireAuthUsername, interactionController.deleteFolder);
router.get('/getAccountFolders', requireAuthUsername, interactionController.getAccountFolders);

router.put('/upsertReview', requireAuthUsername, interactionController.upsertReview);
router.delete('/deleteReview', requireAuthUsername, interactionController.deleteReview);
router.post('/uploadReviewImage/:review_uuid', requireAuthUsername, upload.single('file'), interactionController.uploadReviewImage);
router.delete('/deleteReviewImage/:review_uuid', requireAuthUsername, interactionController.deleteReviewImage);

module.exports = router;
