const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

// const url = "mongodb+srv://vamsi:vamsi@123@cluster0-gxxr8.mongodb.net/test?retryWrites=true&w=majority";
const url="mongodb+srv://vamsi:vamsi@123@cluster0-sb3ge.mongodb.net/info1?retryWrites=true&w=majority";
const connect = mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology:true ,useFindAndModify:true});

module.exports = connect;
