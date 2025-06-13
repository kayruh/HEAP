const express = require('express');
const router = express.Router();

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
//receiving information use get

//send information use post

//update information use put
router.post("/createBIZAccount", async (req, res) => { 

    try {
        console.log("created BIZ account");
        res.status(200).json({
            message: "created BIZ acccount"
        })


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



module.exports = router;