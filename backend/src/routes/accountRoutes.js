const express = require('express');
const router = express.Router();
const accountController = require("../controllers/accountController")

router.get("/getAll", accountController.getAll)

router.post("/updateAccount", accountController.updateAccount)

module.exports = router;