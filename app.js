var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Breathe',{ useNewUrlParser: true , useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));


var Recipient = require('./models/recipient');
var Donor = require('./models/donor');
var Hospital = require('./models/hospital');
var Avail = require('./models/avail');



app.get("/recipients",function(req,res){
	Recipient.find({}, function(err,recipients){
	if(err)
		console.log(err);
	else
		res.render("./recipient/show_recipients.ejs", {recipients: recipients});
	});
});

app.get("/recipients/new",function(req,res){
		res.render("recipient/recipient.ejs");
});

app.post("/recipients",function(req,res){
	var name = req.body.name;
	var userID = req.body.userID;
	var password = req.body.password;
	var blood_group = req.body.blood_group;
	var organ = req.body.organ;
	var contact_no = req.body.contact_no;
	var city = req.body.city;

	
	Recipient.create({
			name: name,
			userID: userID, 
			password: password,
			blood_group: blood_group,
			organ_needed: organ,
			contact_no: contact_no,
			city: city
		},function(err,recipient){
		if(err)
			console.log(err);
		else
			res.redirect("/recipients");
	});
});

app.get("/donors",function(req,res){
	Donor.find({}, function(err,donor){
	if(err)
		console.log(err);
	else
		res.render("donor/show_donors.ejs", {donor: donor});
	});
});

app.get("/donors/new",function(req,res){
		res.render("donor/donor.ejs");
});

app.post("/donors",function(req,res){
	var name = req.body.name;
	var userID = req.body.userID;
	var password = req.body.password;
	var blood_group = req.body.blood_group;
	var dob = req.body.dob;
	var organ = req.body.organ;
	var city = req.body.city;
	var contact_no = req.body.contact_no;
	
	Donor.create({
			name: name,
			userId: userId, 
			password: password,
			blood_group: blood_group,
			//dob: dob,
			organ: organ,
			city: city,
			contact_no: contact_no
		},function(err,donor){
		if(err)
			console.log(err);
		else
			res.redirect("/donors");
	});
});

app.get("/hospitals",function(req,res){
	Hospital.find({}, function(err,hospitals){
	if(err)
		console.log(err);
	else
		res.render("hospital/show_hospitals.ejs", {hospitals: hospitals});
	});
});

app.get("/hospitals/new",function(req,res){
	res.render("hospital/hospital.ejs");
});

app.post("/hospitals",function(req,res){
	var name = req.body.name;
	var reg_ID = req.body.reg_ID;
	var password = req.body.password;
	var doctor_name = req.body.doctor_name;
	var license_no = req.body.license_no;
	var city = req.body.city;
	
	Hospital.create({
			name: name,
			reg_ID: reg_ID, 
			password: password,
			// doctor_name: doctor_name,
			license_no: license_no,
			city: city
		},function(err,hospital){
		if(err)
			console.log(err);
		else
			res.redirect("/status");
	});
});


app.get("/",function(req,res){
	res.render("index.ejs");
});

app.get("/status",function(req,res){
	Avail.find({}, function(err,organs){
	if(err)
		console.log(err);
	else
		res.render("./hospital/status", {organs: organs});
	});
});

app.get("/avail",function(req,res){
	res.render("./hospital/avail.ejs");
});

app.post("/status",function(req,res){
	var name = req.body.name;
	var bloodgrp = req.body.bloodgrp;
	var duration = req.body.duration;
	
	Avail.create({
			name: name,
			bloodgrp: bloodgrp,
			duration: duration
		},function(err,organ){
		if(err)
			console.log(err);
		else
			res.redirect("/status");
	});
});

app.listen(27017,process.env.IP,function(){
	console.log("The Breathe Server Is Started");
});