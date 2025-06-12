const express = require('express');
const router = express.Router();
const user = require("../controller/userController")

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

router.get("/createAccount", async (req, res) => {

    try {
        const {name} = req.body //body vs params : params reveals ur key value through the link
        const userAccountCreated = await user.createUerAccount(name);

        req.status(200).json({
            message: "it works"
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;