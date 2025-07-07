const express = require('express');
const router = express.Router();
const businessController = require("../controllers/businessController")

//get all business information
router.get("/getAll", businessController.getAll)

//update business details name, location description
router.patch("/updateBusinessDetails/:clerk_id", businessController.updateBusinessDetails)

//post/update/delete new picture
router.patch("/updateBusinessDisplay/:clerk_id", businessController.updateBusinessDisplay)

router.get("/getBusinessInfo/:clerk_id", businessController.getBusinessInfo)



module.exports = router;