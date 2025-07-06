const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.get("/getAll", userController.getAll)

router.post("/updateUser", userController.updateUser)

router.get("/getUserInfo", userController.getUserInfo)

module.exports = router;


// for frontend to call backend go to localhost:3000/user/updateUser and provide the raw json information

//endpoints i need to add
//private get all users
//create users
//delete users
//checkusers
//edit information
