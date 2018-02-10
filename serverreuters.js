
// Dependencies 123

var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
// app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "newsScrape";
var collections = ["scrapperNews"];

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

// // 2. At the "/all" path, display every entry in the animals collection

app.get("/scrape", function(req, res) {
  // res.send("Hello world scrape");
  // Make a request for the news section of ycombinator
  request("https://www.reuters.com/news/archive/businessNews?view=page", function(error, response, html){

  var $ = cheerio.load(html);
  console.log("hello");
  // var results = [];
  // console.log($);
  // console.log(html);
    // For each element with a "article" class
    $(".module").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      $("story").each(function(i, element) {
        var image = $(element).children("a").attr("href");
        var article = $(element).children().first().text();
       
  
  // If this found element had both a title and a link
  if (image && article) {
    // Insert the data in the scrapedData db
    db.newsScrape2.insert({
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
  });
    res.send("news Complete");
});
app.get("/all", function(req, res) {
    // res.send("Hello world all");
    // Query: In our database, go to the animals collection, then "find" everything
    db.newsScrape2.find({}, function(error, found) {
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
// });
  app.listen(7000, function() {
    console.log("App running on port 7000!");
  });
 

