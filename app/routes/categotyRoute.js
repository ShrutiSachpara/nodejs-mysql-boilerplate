const express = require('express')
const router = express();
const categoryController = require('../controller/categoryController');
const {generateToken, authenticate} = require('../helper/auth');

router.post('/addCategory',authenticate,categoryController.addCategory);
router.get('/viewCategory',categoryController.viewCategory);
router.put('/updateCategory/:id',authenticate,categoryController.updateCategory);
router.delete('/deleteCategory/:id',authenticate,categoryController.deleteCategory);
router.delete('/multipleDeleteCategory',authenticate,categoryController.multipleDeleteCategory);

module.exports = router