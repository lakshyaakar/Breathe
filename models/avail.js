var mongoose = require("mongoose");

var AvailSchema = new mongoose.Schema({
	name: String,
	bloodgrp: String,
	duration: Number
});

module.exports = mongoose.model("Avail",AvailSchema);