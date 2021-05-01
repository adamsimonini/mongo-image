var express = require("express");
var router = express.Router();
var userModel = require("../models/User");
var multer = require("multer");
var fs = require("fs");
var path = require("path");

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now());
	}
});

var upload = multer({ storage: storage });

router.get("/", (req, res) => {
	userModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send("An error occurred", err);
		} else {
			res.render("userPage", { items: items });
		}
	});
});

router.post("/", upload.single("image"), (req, res, next) => {
	var obj = {
		username: req.body.name,
		email: req.body.email,
		img: {
			data: fs.readFileSync("uploads/" + req.file.filename),
			contentType: "image/png"
		}
	};

	userModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		} else {
			item.save();
			res.redirect("/");
		}
	});
});

module.exports = router;
