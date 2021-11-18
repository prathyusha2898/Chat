var express=require('express');
var router=express.Router();

var DashBoardController=require('./../controllers/dashBoard'); 

router.get('/', DashBoardController.fetchData);

module.exports=router;