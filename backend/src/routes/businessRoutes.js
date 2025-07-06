const express = require('express');
const router = express.Router();
const businessController = require("../controllers/businessController")

//get all business information
router.get("/getAll", businessController.getAll)

//update business details name, location description
router.post("/updateBusinessDetails", businessController.updateBusinessDetails)

//post/update/delete new picture
router.post("/updateBusinessDisplay", businessController.updateBusinessDisplay)



module.exports = router;