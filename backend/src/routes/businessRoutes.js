const express = require('express');
const router = express.Router();
const businessController = require("../controllers/businessController")

//get all business information
router.get("/getAll", businessController.getAll)

//update business details name, location description
router.patch("/updateBusinessDetails/:username", businessController.updateBusinessDetails)

//post/update/delete new picture
router.patch("/updateBusinessDisplay/:username", businessController.updateBusinessDisplay)

router.put("/upsertEvent/:username")

router.get("/getBusinessInfo/:username", businessController.getBusinessInfo)



module.exports = router;