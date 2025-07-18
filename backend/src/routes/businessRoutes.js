const express = require('express');
const multer = require('multer');
const router = express.Router();
const businessController = require("../controllers/businessController");
const clerkexpress = require("@clerk/express")

//get all business information
// router.get("/getAll", businessController.getAll)

//post/update/delete new picture
router.get("/getBusinessInfo/:username", businessController.getBusinessInfo)

router.put("/upsertEvent", clerkexpress.requireAuth(), businessController.upsertEvent)

router.delete("/deleteEvent", clerkexpress.requireAuth(), businessController.deleteEvent)

router.get("/getEvents/:username", businessController.getEvents)

router.get("/countEvents/:username", businessController.countEvents)

//get events specific to the persons username no authentications required

const upload = multer();                 

router.post(
  '/uploadBusinessImage',
  clerkexpress.requireAuth(),
  upload.single('file'),                 
  businessController.uploadBusinessImage
);

router.get(
  '/getBusinessImage/:username',
  businessController.getBusinessImage
);

router.delete(
  '/deleteBusinessImage',
  clerkexpress.requireAuth(),
  businessController.deleteBusinessImage
);

router.get('/checkBusinessEventExist', businessController.checkBusinessEvent)

router.post(
  '/uploadEventImage/:event_uuid',
  clerkexpress.requireAuth(),
  upload.single('file'),                 
  businessController.uploadEventImage
);

router.get(
  '/getEventImage/:event_uuid',
  businessController.getEventImage
);

router.delete(
  '/deleteBusinessImage/:event_uuid',
  clerkexpress.requireAuth(),
  businessController.deleteBusinessImage
);

module.exports = router;