const express = require('express');

const user = require('./userRoutes');
const business = require('./businessRoutes')
const interaction = require('./interactionRoutes')
const app = require("./appRoutes")
const clerk = require('./clerkRoutes')

const router = express.Router();
// creates routing system to differentiate users and businesses


router.use('/user', user)
router.use('/business', business)
router.use('/interaction', interaction)
router.use('/app', app)
router.use('/clerk', clerk)

module.exports = router;