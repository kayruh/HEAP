const express = require('express');

const user = require('./userRoutes');
const business = require('./businessRoutes')
const userbusiness = require('./UserBusinessRoutes')
const account = require('./accountRoutes')

const router = express.Router();
// creates routing system to differentiate users and businesses

router.use('/user', user)
router.use('/business', business)
router.use('/userbusiness',userbusiness)
router.use('/account',account)

module.exports = router;