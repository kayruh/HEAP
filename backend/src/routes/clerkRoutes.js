const express = require('express');
const router = express.Router();
const clerkexpress = require("@clerk/express");
const clerkController = require('../controllers/clerkController');

router.get('/getAvatar/:username', clerkexpress.requireAuth() ,clerkController.getAvatar);

module.exports = router;

