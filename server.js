// * npm packages
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
//scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

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
mongoose.connect("mongodb://localhost/web-scraper", {
	useMongoClient: true
});

//* routes

// GET

// scrape autostraddle for articles 
app.get("/scrape", function(req, res){
	//use axios to grab body of html
	axios.get("https://www.autostraddle.com/").then(function(response){
		//load data into cherrio
		//save it as $ as shorthand
		var $ = cheerio.load(response.data);

		$("").each(function(i, element){
			//empty result object will be populated with key data pieces
			var result = {};

			//save the title of each article
			result.title

			result.link

			result.summary

		})

	})

});























