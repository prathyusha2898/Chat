var mongoose=require('mongoose');

var commentSchema=new mongoose.Schema({
    text:String,
    createdAt:Date,
    updatedAt:Date,
    author:String,
    postauthor:String,
    comments:[this],
    postid:String    
})

var Comment=mongoose.model('Comment',commentSchema,'comments');

module.exports = Comment;