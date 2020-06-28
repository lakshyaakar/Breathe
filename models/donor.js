var mongoose = require("mongoose");

var donorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	userID: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	blood_group: {
		type: String,
		required: true
	},
	organ: {
		type: String,
		required: true
	},
	contact_no: {
		type: Number,
		required: true
	},
	city: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Donor",donorSchema);