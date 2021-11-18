var mongoose=require('mongoose');

// Other models involved in UserData

var Comment=require('./Comment');

var userDataSchema=new mongoose.Schema({
    startTime:Date,
    endTime:Date,
    username:String,
    title:String,
    content:String,
    canChat:String,
    canCall:String,
    canLocate:String,
    canEmail:String,
    file:String,
    image:String,
    video:String,
    comments:[Comment.schema]
})

var UserData=mongoose.model('UserData',userDataSchema,'UserData');

module.exports = UserData;