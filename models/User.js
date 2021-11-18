var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    username:String,
    phone:Number,
    email:String,
    password:String,
    logs:Array
})

var User=mongoose.model("User",userSchema,"User");

module.exports = User;