// * npm packages
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
//scraping tools
const cheerio = require("cheerio");
const request = require("request");

// * database
// require all models
const db = require("./models");
// establish port
const PORT = 3000;

//* app
// initialize express
const app = express();

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
// route :: scrape autostraddle for articles and send to webpage to be rendered
app.get("/scrape", function(req, res){
	//make request call to grab body of html
	request("https://www.autostraddle.com/tag/epic/", function(error, response, html){
		//load data into cherrio
		//save it as $ as shorthand
		const $ = cheerio.load(html);
		//create empty array to hold result objects in
		let results = [];
		//grab every header tag with entry-header class
		$("article.tag-epic").each(function(i, element){
			//empty result object will be populated with key data pieces
			const result = {};
			//save the title of each article
			const title = $(element)
				.find("h1")
				.children("a")
				.text();
			//save the link of each article
			const link = $(element)
				.find("h1")
				.children("a")
				.attr("href");
			//save summary of each article
			const summary = $(element)
				.children("div.entry-summary")
				.text();
			//make title, link, summary keys in result object
			const {title, link, summary} = result;
			//push result to results array
			results.push(result);
		});

	res.json(results);

	});
});

// // GET
// // route :: scrape autostraddle for articles and store in db
// app.get("/scrape", function(req, res){
// 	//make request call to grab body of html
// 	request("https://www.autostraddle.com/tag/epic/", function(error, response, html){
// 		//load data into cherrio
// 		//save it as $ as shorthand
// 		var $ = cheerio.load(html);
// 		//grab every header tag with entry-header class
// 		$("article.tag-epic").each(function(i, element){
// 			//empty result object will be populated with key data pieces
// 			var result = {};
// 			//save the title of each article
// 			result.title = $(element)
// 				.find("h1")
// 				.children("a")
// 				.text();
// 			//save the link of each article
// 			result.link = $(element)
// 				.find("h1")
// 				.children("a")
// 				.attr("href");
// 			//save summary of each article
// 			result.summary = $(element)
// 				.children("div.entry-summary")
// 				.text();
// 			//create new Article using result object
// 			db.Article
// 				.create(result)
// 				.then(function(dbArticle){
// 					//if scrape successful, notify client
// 					res.send("Scrape Complete");
// 				})
// 				.catch(function(err){
// 					//if error, send it to client
// 					res.json(err);
// 				});
// 		});
// 	});
// });


// GET
// route :: get all articles from the db
app.get("/articles", function(req, res){
	//grabs all the articles stored in db
	db.Article
		//finds all articles in collection
		.find({})
		.then(function(dbArticle){
			//sends articles to client
			res.json(dbArticle);
		})
		.catch(function(err){
			//sends error to client
			res.json(err);
		})
});

// GET
// route :: get a specific article by id along with its note
app.get("/articles/:id", function(req, res){
	db.Article
		//find article where ids match
		.findOne({_id: req.params.id})
		//populate note model affiliated
		.populate("note")
		.then(function(dbArticle){
			//sends article and note to client
			res.json(dbArticle);
		})
		.catch(function(err){
			//sends error to client
			res.json(err);
		})
});

// POST
// route :: save/update an article's associated note
app.post("/articles/:id", function(req, res){
	db.Note
		//create note using client's request data
		.create(req.body)
		.then(function(dbNote){
			//find article by id and update its note
			//return the updated article 
			return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote_id}, {new: true});
		})
		.then(function(dbArticle){
			//send updated article to client
			res.json(dbArticle);
		})
		.catch(function(err){
			//send error to client
			res.json(err);
		})

});

// * Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});




















