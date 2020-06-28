var express = require('express');
var router = express.Router();

var Recipient = require('../models/recipient');
var Donor = require('../models/donor');
var Hospital = require('../models/hospital');
var Avail = require('../models/avail');

router.get("/",function(req,res){
	res.render("index.ejs");
});

router.get("/recipients",function(req,res){
	Recipient.find({}, function(err,recipients){
	if(err)
		console.log(err);
	else
		res.render("./recipient/show_recipients.ejs", {recipients: recipients});
	});
});



router.get("/donors",function(req,res){
	Donor.find({}, function(err,donors){
	if(err)
		console.log(err);
	else
		res.render("donor/show_donors.ejs", {donors: donors});
	});
});



router.get("/hospitals",function(req,res){
	Hospital.find({}, function(err,hospitals){
	if(err)
		console.log(err);
	else
		res.render("hospital/show_hospitals.ejs", {hospitals: hospitals});
	});
});


router.get("/status",function(req,res){
	Avail.find({}, function(err,organs){
	if(err)
		console.log(err);
	else
		res.render("./hospital/status", {organs: organs});
	});
});

router.get("/avail",function(req,res){
	res.render("./hospital/avail.ejs");
});

router.post("/status",function(req,res){
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

module.exports = router;