// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper2";
var collections = ["scrapedData2"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello News Scraper");
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData2.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape2", function(req, res) {
  // Make a request for the news section of ycombinator

  request("https://www.reuters.com/news/archive/businessNews?view=page", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    var results = [];

console.log(results);
  });
});
//     // For each element with a "title" class
//     $("section.module  ").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var image = $(element).children("section.module-content").attr("href");
//       var article = $(element).children("a").first().text();
    

//       // If this found element had both a title and a link
//       if (image && article) {
//         // Insert the data in the scrapedData2 db
//         // setTimeout(doSomething, 3000);
//         db.scrapedData2.insert({
//           article: article,
//           image: image
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // setTimeout(doSomething, 3000);
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
// //   setTimeout(doSomething, 3000);
//   res.send("Scrape Complete");
// });


// Listen on port 3000
app.listen(8000, function() {
  console.log("App running on port 8000!");
});
