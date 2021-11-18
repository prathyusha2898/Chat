var express=require('express');
var router=express.Router();

var InfoController=require('./../controllers/viewInfo');

router.get('/editUser/:infoId', InfoController.editInfo);

router.get('/viewInfo/:username/:postid', InfoController.viewInfo);

router.get('/viewLog/:id', InfoController.viewLog);

router.post('/deleteData/:infoId', InfoController.deleteUserInfo);

router.get('/showUserInfo/:username', InfoController.showUserInfo);

module.exports=router;