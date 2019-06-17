var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArticleScrape = new Schema({
    NewsLink: {
        type: String,
        required: "Title is required!"
    },
    NewsSummary: String,
    NewsTitle: {
        type: String,
        required: "Title is required!"
    }
});

module.exports = mongoose.model("Article", ArticleScrape);