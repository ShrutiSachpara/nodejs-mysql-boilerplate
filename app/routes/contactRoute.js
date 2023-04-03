const express = require('express')
const router = express();
const contactController = require('../controller/contactController');
const {generateToken, authenticate} = require('../helper/auth');

router.post('/addContact',authenticate, contactController.addContact);
router.get('/viewContact',authenticate,contactController.viewContact);
router.put('/updateContact/:id',authenticate,contactController.updateContact);
router.delete('/deleteContact/:id',authenticate,contactController.deleteContact);
router.delete('/multipleDeleteContact',authenticate,contactController.multipleDeleteContact);

module.exports = router