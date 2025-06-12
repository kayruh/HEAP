const express = require('express');

const user = require('./user');
const business = require('./business')

const router = express.Router();
// creates routing system to differentiate users and businesses

router.use('/user', user)
router.use('/business', business)

module.exports = router;