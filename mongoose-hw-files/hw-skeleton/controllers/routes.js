var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

// Requiring our Comment and Article models
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");
var Article = require("../models/User.js");

	router.get("/", function (req, res) {
		// Make a request for the sports section 
		request("https://www.si.com/college-basketball", function (error, response, html) {

			var $ = cheerio.load(html);	
			var results = [];	
			// Save the text and href of each link enclosed in the current element
			$("article.list-item").each(function (i, element) {
				var link = $(element).children(".media-img").attr("href");
				var title = $(element).children().first().text();


				// If this found element had both a title and a link
				if (link && title) {
					// Insert the data in the scrapedData db
					Article.create({
							title: title,
							link: link
						},
						function (err, inserted) {
							if (err) {
								// Log the error if one is encountered during the query
								console.log(err);
							} else {
								// Otherwise, log the inserted data

							}
						});
				}
			});
		});
		res.send("Scrape3 Complete");
	});
	router.get("/all", function(req, res) {
		// Find all results from the scrapedData collection in the db
		Article.find({}, function(error, found) {
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
	router.get("/populateduser", function (req, res) {
		// Find all users
		User.find({})
			// Specify that we want to populate the retrieved users with any associated comments
			.populate("comments")
			.then(function (dbUser) {
				// If able to successfully find and associate all Users and comments, send them back to the client
				res.json(User);
			})
			.catch(function (err) {
				// If an error occurs, send it back to the client
				res.json(err);
			});
	});
// 	res.render("comments", db.user)
// });

router.post("/savecomments", function (req, res) {
	// Create a new comment in the db
	db.Comment.create(req.body)
		.then(function (Comment) {
			// If a Comment was created successfully, find one User (there's only one) and push the new Comment's _id to the User's  arraycomments
			// { new: true } tells the query that we want it to return the updated User -- it returns the original by default
			// Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
			return db.User.findOneAndUpdate({}, {
				$push: {
					comment: Comment._id
				}
			}, {
				new: true
			});
		})
		.then(function (User) {
			// If the User was updated successfully, send it back to the client
			res.json(User);
		})
		.catch(function (err) {
			// If an error occurs, send it back to the client
			res.json(err);
		});
});
// // Look into 19.Populated-Exercise activity server.js line ~96 "app.post("/submit" ..." route.

// // in a post request incomming data (from front end) is in req.body

// // res.redirect("/");



// router.post("/deletecomments", function (req, res) {


// 	res.redirect("/");

// });

module.exports = router;