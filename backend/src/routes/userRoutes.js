const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.get("/getAll", userController.getAll)

router.patch("/updateUser/:clerk_id", userController.updateUser)

router.get("/getUserInfo/:clerk_id", userController.getUserInfo)

module.exports = router;


// for frontend to call backend go to localhost:3000/user/updateUser and provide the raw json information

//endpoints i need to add
//private get all users
//create users
//delete users
//checkusers
//edit information
