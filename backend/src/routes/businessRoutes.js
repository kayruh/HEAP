const express = require('express');
const router = express.Router();
const businessController = require("../controllers/businessController");
const clerkexpress = require("@clerk/express")

//get all business information
// router.get("/getAll", businessController.getAll)

//post/update/delete new picture
router.get("/getBusinessInfo/:username", businessController.getBusinessInfo)

router.patch("/updateBusinessDisplay", clerkexpress.requireAuth(), businessController.updateBusinessDisplay)

router.put("/upsertEvent", clerkexpress.requireAuth(), businessController.upsertEvent)

router.delete("/deleteEvent", clerkexpress.requireAuth(), businessController.deleteEvent)

router.get("/getEvents/:username", businessController.getEvents)

//get events specific to the persons username no authentications required





module.exports = router;