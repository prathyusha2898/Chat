//Models used in this routes
var User=require('./../models/User');
var UserData=require('./../models/UserData');

exports.fetchData=function(req,res,next){
    var dataExists=false;
    var infoId;
    UserData.find({},(err,userdatas)=>{
        if(err){
            console.log(err);
            res.redirect('/')
        }else{
            console.log(userdatas)
            var recentSubmitUsers=[];
            var presentTime=new Date();
            if(userdatas.length>0){
                userdatas.forEach(user=>{
                    if(user.endTime.getTime()>=presentTime.getTime()){
                        recentSubmitUsers.push({
                            name:user.username,
                            postid:user._id
                        })
                    }   
                })
            }else{
                var recentSubmitUsers=[]
            }
            var host=req.headers.host;
            if(recentSubmitUsers.length>0){
                recentSubmitUsers.forEach(recentuser=>{
                    if(recentuser.name==req.session.user.username){
                        dataExists=true;
                        infoId=recentuser.postid;
                    }
                })    
            }
            res.render('index',
            {   hostname:host,
                user:req.session.user,
                viewableUsers:recentSubmitUsers,
                dataExists:dataExists,
                currentUserinfoId:infoId
            });
        }
    })
}