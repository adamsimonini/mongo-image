var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || "3000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

var routes = require("./routes");
app.use(routes);

mongoose.connect(
	"mongodb://localhost/mongo-image",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	err => {
		err ? console.log(err) : console.log("connected to mongodb");
	}
);

app.listen(port, err => {
	if (err) throw err;
	console.log("Server listening on port", port);
});
