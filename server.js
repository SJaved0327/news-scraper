// * npm packages
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
//scraping tools
var cheerio = require("cheerio");
var request = require("request");

// * database
// require all models
var db = require("./models");
// establish port
var PORT = 3000;

//* app
// initialize express
var app = express();

//* middleware
// set up morgan for loggin requests
app.use(logger("dev"));
// set up body-parser to catch form submissions
app.use(bodyParser.urlencoded({ extended: false}));
// serve public folder as static directory to client
app.use(express.static("public"));

//* mongoose connect to mongodb
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/web-scraper");

//* routes

// GET
// scrape autostraddle for articles 
app.get("/scrape", function(req, res){

	//make request call to grab body of html
	request("https://www.autostraddle.com/tag/epic/", function(error, response, html){
		//load data into cherrio
		//save it as $ as shorthand
		var $ = cheerio.load(html);
		
		//grab every header tag with entry-header class
		$("article.tag-epic").each(function(i, element){
			
			//empty result object will be populated with key data pieces
			var result = {};

			//save the title of each article
			result.title = $(element)
				.find("h1")
				.children("a")
				.text();
			//save the link of each article
			result.link = $(element)
				.find("h1")
				.children("a")
				.attr("href");
			//save summary of each article
			result.summary = $(element)
				.children("div.entry-summary")
				.text();

			//create new Article using result object
			db.Article
				.create(result)
				.then(function(dbArticle){
					//if scrape successful, notify client
					res.send("Scrape Complete");
				})
				.catch(function(err){
					//if error, send it to client
					res.json(err);
				});
		});
	});
});


// * Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});




















