const express = require('express');
const router = express.Router();
const accountController = require("../controllers/accountController")

router.get("/getAll", accountController.getAll)

router.post("/updateAccount", accountController.updateAccount) //have to remove this due to clerk

module.exports = router;