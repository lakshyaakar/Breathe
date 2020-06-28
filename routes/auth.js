var express = require('express');
var router = express.Router();

var Recipient = require('../models/recipient');
var Donor = require('../models/donor');
var Hospital = require('../models/hospital');
var Avail = require('../models/avail');
const  bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_SECRET} = require('./keys');

router.get("/recipients/new",function(req,res){
		res.render("recipient/recipient.ejs");
});

router.get("/recipients",function(req,res){
	Recipient.find({}, function(err,recipients){
	if(err)
		console.log(err);
	else
		res.render("./recipient/show_recipients.ejs", {recipients: recipients});
	});
});

router.post("/recipients",function(req,res){
	var name = req.body.name;
	var userID = req.body.userID;
	var password = req.body.password;
	var blood_group = req.body.blood_group;
	var organ = req.body.organ;
	var contact_no = req.body.contact_no;
	var city = req.body.city;

	Recipient.findOne({userID:userID})
	.then((savedUser)=>{
		if (savedUser) {
			return res.status(422).json({err:"Recipient already exists"})
		}
		bcrypt.hash(password,12)
		.then(hashedpassword=>{
				
			Recipient.create({
				name: name,
				userID: userID, 
				password: hashedpassword,
				blood_group: blood_group,
				organ_needed: organ,
				contact_no: contact_no,
				city: city
			},function(err,recipient){
			if(err)
				console.log(err);
			else
				res.redirect("/status");
				//console.log("user saved successfullyy");
			});

		})
	})
	.catch(err=>{
		console.log(err);
	})
	
});

router.get("/recipients/signin",(req,res)=>{
	res.render("./recipient/recipient_login.ejs")
})

router.post("/recipients/signin",function(req,res){
	
	var userID = req.body.id;
	var password = req.body.password;

	Recipient.findOne({userID:userID})
	.then((savedUser)=>{
		if (!savedUser) {
			return res.status(422).json({err:"Invalid Email or password"})
		}
		bcrypt.compare(password,savedUser.password)
		.then(doMatch=>{
			if (doMatch) {
				res.redirect('/status');
				// const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
				// res.json({token});
			}
			else
				return res.status(422).json({err:"Invalid Email or password"})

		})
	})
	.catch(err=>{
		console.log(err);
	})
	
});


router.get("/donors/new",function(req,res){
		res.render("donor/donor.ejs");
});

router.post("/donors",function(req,res){
	var name = req.body.name;
	var userID = req.body.userID;
	var password = req.body.password;
	var blood_group = req.body.blood_group;
	var organ = req.body.organ;
	var contact_no = req.body.contact_no;
	var city = req.body.city;

	Donor.findOne({userID:userID})
	.then((savedUser)=>{
		if (savedUser) {
			return res.status(422).json({err:"Donor already exists"})
		}
		bcrypt.hash(password,12)
		.then(hashedpassword=>{
				
			Donor.create({
				name: name,
				userID: userID, 
				password: hashedpassword,
				blood_group: blood_group,
				organ: organ,
				contact_no: contact_no,
				city: city
			},function(err,donor){
			if(err)
				console.log(err);
			else
				res.redirect("/");
				//console.log("user saved successfullyy");
			});

		})
	})
	.catch(err=>{
		console.log(err);
	})
	
});

router.get("/donors/signin",(req,res)=>{
	res.render("./donor/donor_login.ejs")
})

router.post("/donors/signin",function(req,res){
	var userID = req.body.id;
	var password = req.body.password;


	Donor.findOne({userID:userID})
	.then((savedUser)=>{
		if (!savedUser) {
			return res.status(422).json({err:"Invalid Email or password"})
		}
		bcrypt.compare(password,savedUser.password)
		.then(doMatch=>{
			if (doMatch) {
				res.redirect('/');
			}
			else
				return res.status(422).json({err:"Invalid Email or password"})


		})
	})
	.catch(err=>{
		console.log(err);
	})
	
});

router.get("/hospitals/new",function(req,res){
	res.render("hospital/hospital.ejs");
});



router.post("/hospitals",function(req,res){
	var name = req.body.name;
	var reg_ID = req.body.reg_ID;
	var password = req.body.password;
	var license_no = req.body.license_no;
	var contact_no = req.body.contact_no;
	var city = req.body.city;

	Hospital.findOne({reg_ID:reg_ID})
	.then((savedUser)=>{
		if (savedUser) {
			return res.status(422).json({err:"Hospital already exists"})
		}
		bcrypt.hash(password,12)
		.then(hashedpassword=>{

			Hospital.create({
				name: name,
				reg_ID: reg_ID, 
				password: hashedpassword,
				license_no: license_no,
				contact_no: contact_no,
				city: city
			},function(err,hospital){
			if(err)
				console.log(err);
			else
				res.redirect("/hospitals_status");
				//console.log("user saved successfullyy");
			});

		})
	})
	.catch(err=>{
		console.log(err);
	})
	
});


router.get("/hospitals/signin",(req,res)=>{
	res.render("./hospital/hospital_login.ejs")
})

router.post("/hospitals/signin",function(req,res){
	
	var reg_ID = req.body.reg_ID;
	var password = req.body.password;

	Hospital.findOne({reg_ID :reg_ID })
	.then((savedUser)=>{
		if (!savedUser) {
			return res.status(422).json({err:"Invalid Email or password"})
		}
		bcrypt.compare(password,savedUser.password)
		.then(doMatch=>{
			if (doMatch) {
				res.redirect('/hospitals_status');
			}
			else
				return res.status(422).json({err:"Invalid Email password"})

		})
	})
	.catch(err=>{
		console.log(err);
	})
	
});


module.exports = router;