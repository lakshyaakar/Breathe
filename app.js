var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/Breathe',{ useNewUrlParser: true , useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));

app.use('/',indexRouter);
app.use('/',authRouter);

app.listen(27017,process.env.IP,function(){
	console.log("The Breathe Server Is Started");
});