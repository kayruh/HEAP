const express = require('express');
const router = express.Router();
const interactionController = require("../controllers/interactionController");

/* ---------- Likes ---------- */
router.put   ('/upsertLike',        interactionController.upsertLike);
router.delete('/deleteLike',        interactionController.deleteLike);
router.get   ('/getAccountLikes/:username',   interactionController.getAccountLikes);
router.get   ('/getBusinessLikes/:business_username', interactionController.getBusinessLikes);

/* ---------- Folders ---------- */
router.put   ('/upsertFolder',      interactionController.upsertFolder);
router.delete('/deleteFolder',      interactionController.deleteFolder);
router.get   ('/getAccountFolders/:username', interactionController.getAccountFolders);

/* ---------- Reviews ---------- */
router.put   ('/upsertReviews',     interactionController.upsertReview); //remove this
router.delete('/deleteReviews/:uuid',interactionController.deleteReview);
router.get   ('/getAccountReviews/:username', interactionController.getAccountReviews);
router.get   ('/getBusinessReviews/:business_username', interactionController.getBusinessReviews);

module.exports = router;