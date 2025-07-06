const express = require('express');
const router = express.Router();
// const userController = require("../controllers/userController") 
const interactionController = require("../controllers/interactionController")

// router.post("/createAccount", userController.createAccount)
router.get("/getAll", interactionController.getAll)



module.exports = router;