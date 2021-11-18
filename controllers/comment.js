//models
var Comment=require('./../models/Comment');
var UserData=require('./../models/UserData'); 


exports.addingComment=function(req,res,next){
    var x={};
    x={
        text:req.body.comment,
        createdAt:new Date(),
        author:req.session.user.username,
        postauthor:req.params.username,
        postid:req.params.postid,
        comments:[]    
    }  
    UserData.findById(req.params.postid,(terr,userdata)=>{
      if(terr){
          console.log(terr);
      }else{
          const comment = new Comment(x);
          userdata.comments.unshift(comment);
          userdata.save();
      }
  })
  res.redirect('/home');
}

exports.addingSubComment=function(req,res,next){
    UserData.findById(req.params.postid)
    .then((userdata) => {
        // console.log(">>> Found post:", post);
        const findComment = (id, comments) => {
          if (comments.length > 0) {
            for (var index = 0; index < comments.length; index++) {
              const comment = comments[index];
              if (comment._id == id) {
                return comment;
              }
              const foundComment = findComment(id, comment.comments);
              if (foundComment) {
                return foundComment;
              }
            }
          }
        };
  
        // console.log("Step 1 find comment id -------------------");
        const comment = findComment(req.params.commentid, userdata.comments); // post.comments.id(commentId);
  
            const commentNew = new Comment({
                text:req.body.scom,
                createdAt:new Date(),
                author:req.session.user.username,
                postauthor:req.params.postauthor,
                postid:req.params.postid,
                comments:[]    
        });
  
    //     console.log("Step 2 unshift new comment ---------------------------");
        comment.comments.unshift(commentNew);
        userdata.markModified('comments');
        return userdata.save();
      }).then((post) =>{
        // console.log("Step 3 Save post ---------------------------");
        res.redirect('/home')
      }).catch((err)=>{
        console.log(err);
      });  
}