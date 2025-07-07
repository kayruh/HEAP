const express = require('express');
const router = express.Router();
const interactionController = require("../controllers/interactionController");

/* ---------- Likes ---------- */
router.put   ('/upsertLike',        interactionController.upsertLike);
router.delete('/deleteLike',        interactionController.deleteLike);
router.get   ('/getAccountLikes/:clerk_id',   interactionController.getAccountLikes);
router.get   ('/getBusinessLikes/:business_clerk_id', interactionController.getBusinessLikes);

/* ---------- Folders ---------- */
router.put   ('/upsertFolder',      interactionController.upsertFolder);
router.delete('/deleteFolder',      interactionController.deleteFolder);
router.get   ('/getAccountFolders/:clerk_id', interactionController.getAccountFolders);

/* ---------- Photos ---------- */
router.put   ('/upsertPhotos',      interactionController.upsertPhotos);
router.delete('/deletePhotos/:uuid',interactionController.deletePhotos);
router.get   ('/getAccountPhotos/:clerk_id',  interactionController.getAccountPhotos);
router.get   ('/getBusinessPhotos/:business_clerk_id', interactionController.getBusinessPhotos);

/* ---------- Reviews ---------- */
router.put   ('/upsertReviews',     interactionController.upsertReviews);
router.delete('/deleteReviews/:uuid',interactionController.deleteReviews);
router.get   ('/getAccountReviews/:clerk_id', interactionController.getAccountReviews);
router.get   ('/getBusinessReviews/:business_clerk_id', interactionController.getBusinessReviews);

module.exports = router;