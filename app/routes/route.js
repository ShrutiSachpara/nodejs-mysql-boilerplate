const express = require('express');
const router = express();

const authRoute = require('./authRoute');
const contactRoute = require('./contactRoute');
const categotyRoute = require('./categotyRoute');
const testimonialRoute = require('../routes/testimonialRoute');
const portfolioRoute = require('../routes/portfolioRoute')

router.use('/',authRoute);
router.use('/',contactRoute);
router.use('/',categotyRoute);
router.use('/',testimonialRoute);
router.use('/',portfolioRoute);


module.exports = router;