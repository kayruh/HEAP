const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.get("/getAll", userController.getAll)

router.post("/updateUser", userController.updateUser)

module.exports = router;