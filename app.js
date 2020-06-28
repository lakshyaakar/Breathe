var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

var dotenv = require('dotenv');
dotenv.config();

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');

//connection with database
var url = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/Breathe';
mongoose.connect(url,{useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));

app.use('/',indexRouter);
app.use('/',authRouter);

app.listen(27017,process.env.IP,function(){
	console.log("The Breathe Server Is Started");
});