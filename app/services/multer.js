const multer = require('multer');
const path = require('path');
require('body-parser');
    
const fileStorage = multer.diskStorage({
    destination : './app/upload/',
    filename : (req,file,cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = multer({
    storage : fileStorage,
    limits : {
        fileSize : 1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Please upload an image file!'));
        }
        cb(undefined,true);
    }
});

module.exports = {
    uploadImage
}