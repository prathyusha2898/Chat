var express=require('express');
var router=express.Router();

var CommentController=require('./../controllers/comment');

router.post('/addComment/:username/:postid/:timeStamp', CommentController.addingComment);

router.post('/addsubComment/:author/:postid/:commentid/:postauthor', CommentController.addingSubComment)

module.exports=router;