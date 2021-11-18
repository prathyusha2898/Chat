var express=require('express');
var router=express.Router();

//fetching controllers
const AuthController=require('./../controllers/auth');

//fetching middlewares
const { forwardAuthenticated } = require('./../middleware/authenticate');

router.get('/',forwardAuthenticated, AuthController.getLogin);

router.post('/login', AuthController.postLogin);

router.get('/signup',forwardAuthenticated, AuthController.getSignup);

router.post('/signup', AuthController.postSignup);

router.get('/logout', AuthController.logout);

module.exports=router;
