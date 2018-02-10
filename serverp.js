// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");
var express = require("express");
var app = express();

// Set up a static folder (public) for our web app

app.use(express.static("public"));

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from espn sports webdev board:" +
            "\n***********************************\n");

request("https://www.si.com/college-basketball", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];
console.log(results);
    $("article.list-item").each(function(i, element){
   
    
    var image =$(element).children(".media-img").attr("href");
    var article = $(element).children().first().text();
    console.log(article);
  
    results.push({
      article: article,
      image: image
    });
  });

  console.log(results);
});
