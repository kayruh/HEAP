const express = require('express');
const router = express.Router();
const interactionController = require("../controllers/interactionController");
const clerkexpress = require("@clerk/express")

/* ---------- Likes ---------- */
router.put   ('/upsertLikeBusiness',        interactionController.upsertLikeBusiness); //secure
router.delete('/deleteLikeBusiness',        interactionController.deleteLikeBusiness);
router.get   ('/getBusinessLikeCount/:business_username', interactionController.getBusinessLikeCount); 


router.put   ('/upsertLikeEvent',        interactionController.upsertLikeEvent); //secure
router.delete('/deleteLikeEvent',        interactionController.deleteLikeEvent);
router.get   ('/getEventLikeCount/:event', interactionController.getEventLikeCount); 


router.get   ('/getAccountLikes',   interactionController.getAccountLikes); //secure

/* ---------- Folders ---------- */
router.put   ('/upsertFolder',      interactionController.upsertFolder); //secure
router.delete('/deleteFolder',      interactionController.deleteFolder); //secure
router.get   ('/getAccountFolders', clerkexpress.requireAuth() ,interactionController.getAccountFolders); //secure

/* ---------- Reviews ---------- */
router.put   ('/upsertReview',     interactionController.upsertReview); //remove this
router.delete('/deleteReview/:uuid',interactionController.deleteReview);
router.get   ('/getAccountReviews/:username', interactionController.getAccountReviews);
router.get   ('/getBusinessReviews/:business_username', interactionController.getBusinessReviews);

module.exports = router;