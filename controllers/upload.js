//Models used in this routes
const UserData=require('./../models/UserData');

exports.addNewInfo=function(req,res,next){
    var x={
        username:req.session.user.username,
        title:req.body.title,
        content:req.body.content,
        canChat:req.body.canchat,
        canCall:req.body.cancall,
        canLocate:req.body.canlocate,
        canEmail:req.body.canmail,
        startTime:new Date(),
        file:req.files.pdffile[0].path,
        image:req.files.photo[0].path,
        video:req.files.video[0].path,
        comments:[]
    }
    var startTime=x.startTime;
    console.log(startTime);
    var eTime=startTime.setMinutes(startTime.getMinutes()+1);
    console.log(eTime);
    x.endTime=new Date(eTime);
    console.log(x);
    UserData.create(x,(err,success)=>{
        if(err){
            console.log('Error while uploading the data');
            res.redirect('/home');
        }else{
            console.log('userdata creation successfull');
            res.redirect('/home');
        }
    });
}

exports.addOldInfo=function(req,res,next){
    UserData.findById(req.params.userdataid)
    .exec((err,userdata)=>{
        if(err){
            console.log(err);
            res.redirect('/login')
        }else{
                // console.log(req.body.type);
                var x={};
                x.username=req.session.user.username;
                x.title=req.body.title;
                x.content=req.body.content;
                x.canChat=req.body.canchat;
                x.canCall=req.body.cancall;
                x.canLocate=req.body.canlocate;
                x.canEmail=req.body.canmail;
                x.startTime=new Date();
                if(req.body.pdffile){
                    x.file=req.body.pdffile;
                }else{
                    x.file=req.files.pdffile[0].path;
                }
                if(req.body.photo){
                    x.image=req.body.photo;
                }else{
                    x.image=req.files.photo[0].path;
                }                
                if(req.body.video){
                    x.video=req.body.video;
                }else{
                    x.video=req.files.video[0].path;
                }                
                x.comments=userdata.comments;
                var sTime=x.startTime;
                var eTime=sTime.setMinutes(sTime.getMinutes()+1);
                x.endTime=new Date(eTime);      
                if(req.body.type=="edit"){
                    UserData.findByIdAndUpdate(req.params.userdataid,x,(terr,ts)=>{
                        if(terr){
                            console.log(terr);
                            res.redirect('/home')
                        }else{
                            console.log('Successfully updated existing info');
                            res.redirect('/home')
                        }
                    })
                }else if(req.body.type=="upload"){
                    UserData.create(x,(therr,thy)=>{
                        if(therr){
                            console.log(therr);
                            res.redirect('/home')
                        }else{
                            console.log('Successfully uploaded a from the infos');
                            res.redirect('/home');
                        }
                    })
                }
        }
    })
}