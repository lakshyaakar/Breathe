var mongoose = require("mongoose");

var hospitalSchema = new mongoose.Schema({
	name: {
		type: String,
		required
	},
	reg_ID: {
		type: String,
		required
	},
	password: {
		type: String,
		required
	},
	license_no: {
		type: Number,
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

module.exports = mongoose.model("Hospital",hospitalSchema);