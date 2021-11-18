var express=require("express"),
    bodyParser=require("body-parser"),
    cors=require('cors'),
    app=express();

    var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/chat");


const session= require('express-session');
const path=require('path');
var connect=require("./dbconnect");

const http = require("http").Server(app);
// const https = require("https");
const publicDirectoryPath=path.join(__dirname,'/public');

//using middlewares
const { ensureAuthenticated } = require('./middleware/authenticate');

//fetching all the routes
const LoginRouter=require('./route/auth');    
const CommentRouter=require('./route/comment');
const ViewMediaRouter=require('./route/viewMedia');
const DashBoardRouter=require('./route/dashBoard');
const UploadRouter=require('./route/upload');
const ViewInfoRouter=require('./route/viewInfo');
const AddTimeRouter=require('./route/addTime');

app.use(cors());
app.use(session({ secret: 'keyboard cat'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(publicDirectoryPath));

//using the routes present in the routers
app.use("/",LoginRouter);
app.use("/",CommentRouter);
app.use("/media", ensureAuthenticated, ViewMediaRouter);
app.use("/home", ensureAuthenticated, DashBoardRouter);
app.use("/", ensureAuthenticated, UploadRouter);
app.use("/", ensureAuthenticated, ViewInfoRouter);
app.use("/addtime", ensureAuthenticated, AddTimeRouter);

var port= process.env.PORT || 5005;

http.listen(port,() => {
        console.log("https running on Port: " + port);
       
})
  

