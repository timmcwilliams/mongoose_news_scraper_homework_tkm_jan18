
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var EXPHBS = require("express-handlebars");
var logger = require("morgan");
var axios = require("axios");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var PORT = process.env.PORT || 9000;

var APP = express();
var db = require("./models");
// Use body parser
APP.use(bodyParser.urlencoded({extended: false}));

// Make public a static dir
APP.use(express.static("public"));
app.use(logger("dev"));
// Set Handlebars.
APP.engine("handlebars", EXPHBS({ defaultLayout: "main" }));
APP.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));

// Database configuration with mongoose
if(process.env.MONGODB_URI)
{
	mongoose.connect(process.env.MONGODB_URI);
}
else
{
	mongoose.connect("mongodb://localhost/sportsScrape3");
}	

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});
// var databaseUrl = "sportsScrape3";
// var collections = ["scrapperSports3"];
// Routes
// ======
var routes = require("./controllers/routes.js");
APP.use("/", routes);

// Listen on port 9000
APP.listen(PORT, function() {
  console.log("App running on port", 9000);
});
