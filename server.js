

var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var mongoose = require("mongoose");
var logger = require("morgan");
var cheerio = require("cheerio");
var bodyParser=require("body-parser");


var Note = require("./models/comments.js");
var Article = require("./models/article.js");

mongoose.Promise = Promise;
// Initialize Express
var app = express();

// app.use(logger("dev"));
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// Set up a static folder (public) for our web app
// app.use(express.static("public"));
// app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/sportsScrape3");
// var db = mongoose.connection;

// Show any mongoose errors
// db.on("error", function(error) {
//   console.log("Mongoose Error: ", error);
// });

// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });
// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "sportsScrape3";
var collections = ["scrapperSports3"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);
// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.send("Hello world");
});
console.log("line55")
// // 2. At the "/all" path, display every entry in the animals collection
app.get("/all", function(req, res) {
  // res.send("Hello world all");
  // Query: In our database, go to the animals collection, then "find" everything
  db.sportsScrape3.find({}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});
app.get("/scrape3", function(req, res) {
  // res.send("Hello world scrape");
  // Make a request for the news section of ycombinator
  request("https://www.si.com/college-basketball", function(error, response, html){
  
  var $ = cheerio.load(html);
  console.log("hello");
  var results = [];
  // console.log($);
  // console.log(html);
    // For each element with a "article" class
    // $(".article").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      $("article.list-item").each(function(i, element) {
        var image = $(element).children(".media-img").attr("href");
        var article = $(element).children().first().text();
       
  
  // If this found element had both a title and a link
  if (image && article) {
    // Insert the data in the scrapedData db
    db.sportsScrape3.insert({
      article: article,
      image: image 
    },
      function(err, inserted) {
        if (err) {
          // Log the error if one is encountered during the query
          console.log(err);
        }
        else {
          // Otherwise, log the inserted data
         
        }
      });
    }
    });
 
  });
 
    res.send("Scrape3 Complete");
});

// });
  app.listen(8000, function() {
    console.log("App running on port 8000!");
  });
 
