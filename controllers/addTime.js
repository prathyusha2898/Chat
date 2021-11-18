var UserData=require('../models/UserData');

exports.timeModifier=function (req,res,next){
    UserData.findById(req.params.infoId,(err,userdata)=>{
        if(err){
            console.log(err);
            res.redirect('/home');
        }else{
            // console.log(userdata);
            var time=userdata.endTime;
            var eTime=time.setMinutes(time.getMinutes()+parseInt(req.body.min,10));
            userdata.endTime=new Date(eTime);
            UserData.findByIdAndUpdate(req.params.infoId,userdata,(terr,ty)=>{
                if(terr){
                    console.log(terr);
                    res.redirect('/home');
                }else{
                    console.log('Successfully added time');
                    res.redirect('/home');
                }
            })
        }
    })
}