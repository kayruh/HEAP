const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.get("/all", async (req, res) => {

    try {
        console.log("works");
        res.status(200).json({
            message: "it works"
        })


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/createAccount", userController.createAccount)

module.exports = router;

//endpoints i need to add
//private get all users
//create users
//delete users
//checkusers
//edit information
