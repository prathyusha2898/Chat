var express=require('express');
var router=express.Router();

var TimeController=require('./../controllers/addTime');
router.post('/:infoId',TimeController.timeModifier)

module.exports=router;