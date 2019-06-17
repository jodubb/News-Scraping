var express = require("express");
var app = express();
var port = process.env.PORT || 8080;



// gathering data form site
var mongoose = require("mongoose");



// deployed database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    console.log("Connected to mongodb");
});

require('./controllers/api/articles.js')(app)









app.listen(port, () => console.log("Listening on Port 8080"));
