const express = require('express');

const user = require('./userRoutes');
const business = require('./businessRoutes')

const router = express.Router();
// creates routing system to differentiate users and businesses

router.use('/user', user)
router.use('/business', business)

module.exports = router;