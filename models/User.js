const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please provide username"]
	},
	email: {
		type: String,
		required: [true, "Please provide email address"],
		unique: true,
		match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email"]
	},
	userCreated: {
		type: Date,
		default: Date.now
	},
	img: {
		data: Buffer,
		contentType: String
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
