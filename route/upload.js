var express=require('express');
var router=express.Router();

//controllers
var UploadController=require('./../controllers/upload');

const multer=require('multer');

const storage = multer.diskStorage({
destination: function(req, file, cb) {
    if(file.fieldname=="pdffile"){
        cb(null, './public/uploads/files/');
    }else if(file.fieldname=="photo"){
        cb(null, './public/uploads/images/');
    }else if(file.fieldname=="video"){
        cb(null, './public/uploads/videos/');
    }
},
filename: function(req, file, cb) {
    if(file.fieldname=="pdffile"){
        cb(null, req.session.user.username+'!_'+file.originalname);
    }else if(file.fieldname=="photo"){
        cb(null, req.session.user.username+'!_'+file.originalname);
    }else if(file.fieldname=="video"){
        cb(null, req.session.user.username+'!_'+file.originalname);
    }
}
});

const fileFilter = (req, file, cb) => {
// reject a file
    if(file.fieldname=="photo"){
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }      
    }else if(file.fieldname=="video"){
        if (file.mimetype === 'video/ogg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
            cb(null, true);
        } else {
            cb(null, false);
        }      
    }else if(file.fieldname=="pdffile"){
        if(file.mimetype=='application/pdf'){
            cb(null, true);
        }
    }
};

const upload = multer({
storage: storage,
limits: {
    fileSize: 1024 * 1024 * 1024 * 5
},
fileFilter: fileFilter
});
    
var cpUpload = upload.fields([{ name: 'photo', maxCount: 3 }, { name: 'video', maxCount: 3 },{name:'pdffile',maxCount: 3}])

router.post('/addInfo',cpUpload, UploadController.addNewInfo);

router.post('/addInfo/:userdataid',cpUpload, UploadController.addOldInfo);

module.exports=router;