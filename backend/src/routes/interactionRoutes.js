const express = require('express');
const router = express.Router();
const interactionController = require("../controllers/interactionController");
const clerkexpress = require("@clerk/express")

/* ---------- Likes ---------- */
router.post   ('/insertLikeBusiness', clerkexpress.requireAuth(), interactionController.insertLikeBusiness); //secure
router.delete('/deleteLikeBusiness',  clerkexpress.requireAuth(), interactionController.deleteLikeBusiness); //secure
router.get   ('/getBusinessLikeCount/:business_username', interactionController.getBusinessLikeCount); 
router.post('/getBusinessLikeCheck', interactionController.getBusinessLikeCheck) //check if user likes the business SECURE


router.post   ('/insertLikeEvent', clerkexpress.requireAuth(),  interactionController.insertLikeEvent); //secure
router.delete('/deleteLikeEvent', clerkexpress.requireAuth(), interactionController.deleteLikeEvent); //secure
router.get   ('/getEventLikeCount/:event', interactionController.getEventLikeCount); 
router.post('/getEventLikeCheck', interactionController.getEventLikeCheck);


// router.get   ('/getAccountLikes',   interactionController.getAccountLikes); //secure -- change this to like business and event separate

/* ---------- Folders ---------- */
router.post   ('/insertFolder', clerkexpress.requireAuth() ,interactionController.insertFolder); //secure might have to chnage this to split insert and update
router.patch   ('/updateFolder', clerkexpress.requireAuth() ,interactionController.updateFolder);
router.delete('/deleteFolder', clerkexpress.requireAuth() ,interactionController.deleteFolder); //secure
router.get   ('/getAccountFolders', clerkexpress.requireAuth() , interactionController.getAccountFolders); //secure
router.post('/getFolderInfo', interactionController.getFolderInfo)

/* ---------- Reviews ---------- */
router.put   ('/upsertReview',     interactionController.upsertReview); //remove this
router.delete('/deleteReview/:uuid',interactionController.deleteReview);
router.get   ('/getAccountReviews/:username', interactionController.getAccountReviews);
router.get   ('/getBusinessReviews/:business_username', interactionController.getBusinessReviews);

module.exports = router;