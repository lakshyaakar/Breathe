var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/Breathe',{ useNewUrlParser: true , useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));

var RecipientSchema = new mongoose.Schema({
	name: String,
	userID: String,
	password: String,
	Blood_Grp: String,
	Organ_needed: String,
	contact_no: Number,
	city: String
});

var DonorSchema = new mongoose.Schema({
	name: String,
	userID: String,
	password: String,
	Blood_Grp: String,
	dob: Date,
	Organ_donate: String,
	city: String,
	contact_no: Number
});

var HospitalSchema = new mongoose.Schema({
	name: String,
	Reg_ID: String,
	password: String,
	doctor_name: String,
	license_no: Number,
	city: String
});

var Recipient = mongoose.model("Recipient",RecipientSchema);
var Donor = mongoose.model("Donor",DonorSchema);
var Hospital = mongoose.model("Hospital",HospitalSchema);

app.get("/",function(req,res){
	res.render("https://lakshyaakar.github.io/Organ__Donation/index.html");
});



app.get("/recipients",function(req,res){
	Recipient.find({}, function(err,recipients){
	if(err)
		console.log(err);
	else
		res.render("./recipient/show_recipients.ejs", {recipients: recipients});
	});
});

app.get("/recipients/new",function(req,res){
		res.render("./recipient/recipient.ejs");
});

app.post("/recipients",function(req,res){
	var name = req.body.name;
	var userID = req.body.userID;
	var password = req.body.password;
	var Blood_Grp = req.body.Blood_Grp;
	var Organ = req.body.Organ;
	var contact_no = req.body.contact_no;
	var city = req.body.city;

	
	Recipient.create({
			name: name,
			userID: userID, 
			password: password,
			Blood_Grp: Blood_Grp,
			Organ_needed: Organ,
			contact_no: contact_no,
			city: city
		},function(err,recipient){
		if(err)
			console.log(err);
		else
			res.redirect("https://lakshyaakar.github.io/Organ__Donation/index.html");
	});
});

app.get("/donors",function(req,res){
	Donor.find({}, function(err,donor){
	if(err)
		console.log(err);
	else
		res.render("index.html", {donor: donor});
	});
});

app.get("/donors/new",function(req,res){
		res.render("./donor/donor.ejs");
});

app.post("/donors",function(req,res){
	var name = req.body.name;
	var userID = req.body.userID;
	var password = req.body.password;
	var Blood_Grp = req.body.Blood_Grp;
	var dob = req.body.dob;
	var Organ = req.body.Organ;
	var city = req.body.city;
	var contact_no = req.body.contact_no;
	
	Donor.create({
			name: name,
			userID: userID, 
			password: password,
			Blood_Grp: Blood_Grp,
			dob: dob,
			Organ_needed: Organ,
			city: city,
			contact_no: contact_no
		},function(err,donor){
		if(err)
			console.log(err);
		else
			res.redirect("https://lakshyaakar.github.io/Organ__Donation/index.html");
	});
});

app.get("/hospitals",function(req,res){
	Hospital.find({}, function(err,hospitals){
	if(err)
		console.log(err);
	else
		res.render("index.html", {hospitals: hospitals});
	});
});

app.get("/hospitals/new",function(req,res){
		res.render("./hospital/hospital.ejs");
});

app.post("/hospitals",function(req,res){
	var name = req.body.name;
	var Reg_ID = req.body.Reg_ID;
	var password = req.body.password;
	var doctor_name = req.body.doctor_name;
	var license_no = req.body.license_no;
	var city = req.body.city;
	
	Hospital.create({
			name: name,
			Reg_ID: Reg_ID, 
			password: password,
			doctor_name: doctor_name,
			license_no: license_no,
			city: city
		},function(err,hospital){
		if(err)
			console.log(err);
		else
			res.redirect("https://lakshyaakar.github.io/Organ__Donation/index.html");
	});
});

app.listen(27017,process.env.IP,function(){
	console.log("The Breathe Server Is Started");
});