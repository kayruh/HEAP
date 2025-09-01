const express = require('express');
const router = express.Router();

// Legacy routes (kept temporarily for backward compatibility)
const user = require('./userRoutes');
const business = require('./businessRoutes');
const interaction = require('./interactionRoutes');
const app = require('./appRoutes');
const clerk = require('./clerkRoutes');

router.use('/user', user);
router.use('/business', business);
router.use('/interaction', interaction);
router.use('/app', app);
router.use('/clerk', clerk);

// New structured routes
const publicApp = require('./public/app');
const publicBusiness = require('./public/business');
const publicInteraction = require('./public/interaction');
const publicUser = require('./public/user');
const publicClerk = require('./public/clerk');

const secureBusiness = require('./secure/business');
const secureInteraction = require('./secure/interaction');

router.use('/public/app', publicApp);
router.use('/public/business', publicBusiness);
router.use('/public/interaction', publicInteraction);
router.use('/public/user', publicUser);
router.use('/public/clerk', publicClerk);

router.use('/secure/business', secureBusiness);
router.use('/secure/interaction', secureInteraction);

module.exports = router;