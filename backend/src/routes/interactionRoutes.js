const express = require('express');
const router = express.Router();
// const userController = require("../controllers/userController") 
const interactionController = require("../controllers/interactionController")

// router.post("/createAccount", userController.createAccount)

//user can like business (interaction 1) user,business, like
router.post("/upsertLike", interactionController.upsertLike)
router.post("/deleteLike", interactionController.deleteLike)
router.get("/getAccountLikes", interactionController.getAccountLikes)
router.get("/getBusinessLikes", interactionController.getBusinessLikes)
// user can create folder and save businesses (interaction 2)user, folder, array(businesses)
router.post("/upsertFolder", interactionController.upsertFolder)
router.post("/deleteFolder", interactionController.deleteFolder)
router.get("/getAccountFolders", interactionController.getAccountFolders)
// business photos posted (business, posted by, photo)
router.post("/upsertPhotos", interactionController.upsertPhotos)
router.post("/deletePhotos", interactionController.deletePhotos)
router.get("/getAccountPhotos", interactionController.getAccountPhotos)
router.get("/getBusinessPhotos", interactionController.getBusinessPhotos)
// business review (business, user, review)
router.post("/upsertReviews", interactionController.upsertReviews)
router.post("/deleteReviews", interactionController.deleteReviews)
router.get("/getAccountReviews", interactionController.getAccountReviews)
router.get("/getBusinessReviews", interactionController.getBusinessReviews)

// router.get("/getAll", interactionController.getAll)



module.exports = router;