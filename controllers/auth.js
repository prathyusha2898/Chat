var bcrypt=require('bcryptjs');

//models
const User=require('./../models/User');
const UserData=require('./../models/UserData');

exports.getLogin=function(req,res,next){
    res.render('login');
}

exports.postLogin=function(req,res,next){
    User.find({username:req.body.uname},(err,user)=>{
        if(err){
            console.log(err);
            res.redirect('/login');
        }else{
            // console.log(admin);
            if(user.length>0){
                var hash=user[0].password;
                bcrypt.compare(req.body.pwd, hash, function(err, response) {
                    // res == true
                    if(response){
                        req.session.user=user[0];
                        currentuser=req.session.user;
                        res.redirect('/home');
                    }else{
                        console.log('Please type the correct password');
                        res.redirect('/login');
                    }
                });    
            }else{
                res.redirect('/login');
                console.log('No such user exists');
            }
        }
    })
}

exports.getSignup=function(req,res,next){
    res.render('signup');
}

exports.postSignup=function(req,res,next){
    var error=0;
    if(!req.body.uname || !req.body.unum || !req.body.pwd || !req.body.rpwd){
        // res.redirect('/signup');
        error++;
        console.log('please enter all fields');
    }
    if (req.body.pwd != req.body.rpwd) {
        error++;
        // res.redirect('/signup');
        console.log('Passwords do not match');       
    }
    if (req.body.pwd.length < 6) {
        error++;
        // res.redirect('/signup');
        console.log('Password must be at least 6 characters')
    }
    if(error>0){
        res.redirect('/signup');
    }    
    else{
        User.findOne({ username: req.body.uname }).then(user => {
        if (user) {
    //       errors.push({ msg: 'Email already exists' });
               console.log('Username already exists');
                res.redirect('/signup');
        } else {
          const newUser = new User({
            username:req.body.uname,
            phone:req.body.unum,
            email:req.body.uemail,      
            password:req.body.pwd
          });

          req.session.user={
            username:req.body.uname,
            phone:req.body.unum,
            email:req.body.uemail,      
            password:req.body.pwd
          };
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {        
                    console.log('User created successfully')
                    res.redirect('/home');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
}

exports.logout=function(req,res,next){
    req.session.destroy();
    res.redirect('/');
}