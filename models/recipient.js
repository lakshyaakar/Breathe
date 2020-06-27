var mongoose = require("mongoose");

var recipientSchema = new mongoose.Schema({
	name: {
		type: String,
		required
	},
	userId: {
		type: String,
		required
	},
	password: {
		type: String,
		required
	},
	blood_group: {
		type: String,
		required
	},
	organ_needed: {
		type: String,
		required
	},
	contact_no: {
		type: Number,
		required
	},
	city: {
		type: String,
		required
	}
});

module.exports = mongoose.model("Recipient",recipientSchema);