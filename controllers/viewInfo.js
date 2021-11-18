//Models used in this routes
const User=require('./../models/User');
const UserData=require('./../models/UserData');

exports.editInfo=function(req,res,next){
    UserData.findById(req.params.infoId,(err,userdata)=>{
        if(err){
            console.log(err);
            res.redirect('/home');
        }else{
            console.log(userdata)
            
            res.send({data:userdata,actualInfo:req.session.user})          
        }
    })
}

exports.viewInfo=function(req,res,next){
    console.log("in vie")
    UserData.findById(req.params.postid)

    console.log(req.params.postid)
    .exec((err,userdata)=>{
        if(err){
            console.log(err);
            res.redirect('/home')
        }else{
             console.log(userdata);
            res.send({data:userdata,actualInfo:req.session.user})
        }
    })
}

exports.viewLog=function(req,res,next){
    User.find({username:req.params.id},(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
}

exports.deleteUserInfo=function(req,res,next){
    UserData.findById(req.params.infoId)
    .exec((err,y)=>{
        if(err){
            console.log(err);
        }else{
            var endTime=new Date();
            // console.log(endTime);
            endTime=endTime.setMinutes(endTime.getMinutes()-5);
            y.endTime=endTime;            
            UserData.findByIdAndUpdate(req.params.infoId,y,(terr,ty)=>{
                if(terr){
                    console.log(terr);
                    res.redirect('/');
                }else{
                    console.log(ty);
                    res.redirect('/');
                }
            })
        }
    })
}

exports.showUserInfo=function(req,res,next){
    UserData.find({username:req.params.username},(err,userdatas)=>{
        if(err){
            console.log(err)
        }else{
            var userdatas=userdatas;
            var length=userdatas.length;
            // req.session.userdatas=userdatas;
            res.send({userdatas:userdatas,infocount:length,email:req.session.user.email})
        }
    })
}