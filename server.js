var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

// looking at data
var cheerio = require("cheerio");
// gathering data form site
var axios = require("axios");
var mongoose = require("mongoose");
var request = require("request");


// deployed database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    console.log("Connected to mongodb");
});

// route for scraping data
app.get("/scrape", function (req, res) {
    console.log("Hi");

    var url = "https://www.washingtonpost.com/business/technology/?utm_term=.5ab659b6a9b7"
    request(url, function (err, response, body) {
        
        // cheerio is loading the results
        var $ = cheerio.load(body);
        var results = [];
        // grabbing the class name from the news site
        $(".story-list-story row first default").each(function (i, element) {
            // targetting the name of the href using "a"
            var link = $(element).children("a").attr("href");
            console.log(element);
            console.log(i);
        })



    });
})














app.listen(port, () => console.log("Listening on Port 8080"));
