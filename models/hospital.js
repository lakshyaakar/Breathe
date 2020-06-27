var mongoose = require("mongoose");

var hospitalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	reg_ID: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	license_no: {
		type: Number,
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

module.exports = mongoose.model("Hospital",hospitalSchema);