const express = require('express');
const router = express.Router();
const appController = require("../controllers/appController");

router.get("/getWhatsHot",appController.getWhatsHot)

router.get("/getFilterEvent",appController.getOngoingEventsAndBusinesses)



module.exports = router;