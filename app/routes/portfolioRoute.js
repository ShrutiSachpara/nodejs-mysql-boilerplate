const express = require('express');
const router = express();
const portfolioController = require('../controller/portfolioController');
const { authenticate } = require('../helper/auth');
const { uploadImage } =require('../services/multer');


router.post('/addPortfolio',authenticate,uploadImage.array('image',5),portfolioController.addPortfolio);
router.get('/viewPortfolio',authenticate,portfolioController.viewPortfolio);
router.put('/updatePortfolio/:id',authenticate,portfolioController.updatePortfolio );
router.delete('/deletePortfolio/:id',authenticate,portfolioController.deletePortfolio);
router.delete('/multipleDeletePortfolio',authenticate,portfolioController.multipleDeletePortfolio);

module.exports = router;    