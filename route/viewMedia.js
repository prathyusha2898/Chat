var express=require('express');
var router=express.Router();
var fs=require('fs');

router.get('/:filetype', (req,res)=>{
    var directoryName=__dirname;
    var parentPublicDirectoryPath=directoryName.slice(0,directoryName.length-5)
    var x=parentPublicDirectoryPath+`/public/uploads/`;
    x+=req.params.filetype;
    var files=fs.readdirSync(x);
    var fileNames=[];
    var fileLinks=[];
    files.forEach(file=>{
        if(file.includes('!_') && file.includes(req.session.user.username)){
            fileLinks.push(file);
            var n=file.indexOf('!_');
            fileNames.push(file.slice(n+2,file.length));
        } 
    })
    res.render('files',{type:req.params.filetype,names:fileNames,links:fileLinks});
});

module.exports=router;
