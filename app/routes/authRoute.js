const express = require('express')
const router = express();
const { uploadImage } =require('../services/multer');
const {generateToken, authenticate} = require('../helper/auth');

const authController = require('../controller/authController')

router.post('/signup',uploadImage.single('image'),authController.signup);
router.post('/loginUser',generateToken,authController.authUser);

router.post('/updateProfile',authenticate,uploadImage.single('image'),authController.updateProfile);
router.get('/viewData',authController.viewData);

router.put('/updatePassword',authController.updatePassword)
router.post('/resetpassword',authenticate,authController.resetpassword);

router.post('/forgetPassword',authenticate,authController.forgetPassword);
router.post('/varifyOtp', authController.verifyOtp);


module.exports = router