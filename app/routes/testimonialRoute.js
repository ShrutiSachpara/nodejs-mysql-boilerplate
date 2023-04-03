const express = require('express')
const router = express();
const testimonialController = require('../controller/testimonialController');
const {generateToken, authenticate} = require('../helper/auth');
const { uploadImage } =require('../services/multer');
const { log } = require('winston');

router.post('/addTestimonial',uploadImage.array('image',5),testimonialController.addTestimonial);
router.get('/viewTestimonial',testimonialController.viewTestimonial);
router.put('/updateTestimonial/:id',testimonialController.updateTestimonial);
router.delete('/deleteTestimonial/:id',testimonialController.deleteTestimonial);
router.delete('/multipleDeleteTestimonial',testimonialController.multipleDeleteTestimonial);

module.exports = router