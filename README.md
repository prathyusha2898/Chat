## Info Module-1

### Main Features
1. User Posting Data
2. User Editing Live Posted Data (or) Uploading Already Posted Data
3. User Buying Time for the Posted Data
4. Other users adding comments and subcomments
5. User Viewing Uploaded Media( photos, videos, files)

### Middlewares
- filename- middleware/authenticate.js 
- functions- ensureAuthenticated, forwardAuthenticated

### Views
1. Login page 
2. Signup page
3. Index page
4. Files page (viewing media)

### Routes

> LoginRouter
- Controller- /controllers/auth
- functions from Controller:- getLogin, postLogin, getSignup, postSignup, logout
- postSignup:- username, phone, email(optional), password
- postLogin:- username,password

> CommentRouter
- Controller- /controllers/comment
- functions from Controller:- addingComment, addingSubComment
- both post routes get some data in the form of req.params 
- addingComment- req.body.comment
- adding SubComment- req.body.scom

 > ViewMediaRouter
- getRoute:- req.params.filetype

 > DashBoardRouter
- Controller- /controllers/dashBoard
- functions from Controller:- fetchData 

 > UploadRouter
- Controller- /controllers/upload
- functions from Controller:- newInfoAddition, oldInfoAddition
- newInfoAddition
  -  creation of a new form
  -  req.body.->title,content,canchat,cancall,canlocate,canmail
  -  req.files.->pdffile[0].path,photo[0].path,video[0].path  
- oldInfoAddition
  - editing of existing form or uploading a  new form from the infolist

> ViewInfoRouter
- Controller- /controllers/info
- functions from Controller:- editUserInfo,viewUserInfo,viewUserLog,deleteUserInfo,showUserInfo 
- editUserInfo:- req.params.infoId
- viewUserInfo:- req.params.postid
- viewUserLog:- req.params.id
- deleteUserInfo:- req.params.infoId
- showUserInfo:- req.params.username


> AddTimeRouter
- Controller- /controllers/time
- functions from Controller:- addTimeToPost
- addTimeToPost:- req.params.infoId 
