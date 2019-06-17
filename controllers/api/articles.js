var cheerio = require("cheerio");
var request = require("request");
var Article = require("../../models/Articles.js")
module.exports = function (app) {



    // route for scraping data
    app.get("/scrape", function (req, res) {
        console.log("Hi");

        var url = "https://www.buzzfeednews.com/"
        request(url, function (error, response, html) {
            // cheerio is loading the results
            var $ = cheerio.load(html);
            var results = [];
            // grabbing the class name from the news site
            $(".newsblock-story-card").each(function (i, element) {
                var NewsTitle = $(element).children('a').children('.newsblock-story-card__info')
                    .children('h2').text();
                var NewsLink = $(element).children('a').attr("href");
                var NewsSummary = $(element).children('a').children('.newsblock-story-card__info')
                    .children('.newsblock-story-card__description').text();
                results.push({
                    NewsTitle: NewsTitle,
                    NewsLink: NewsLink,
                    NewsSummary: NewsSummary,
                })
            });

            console.log(results);
            Article.create(results,
                function (err, data) {
                    if (err) {
                        console.log(error)
                    } else {
                        console.log(data)
                    }

                });



        }, function (req, res) {
            res.redirect('/');

            console.log(results)

        })
    })


    // delete a saved article
    app.delete('/:id', function (req, res) {
        Article.findByIdAndUpdate(req.params.id,
            { $set: { deleted: true } },
            { new: true },
            function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500);
                } else {
                    res.direct('/saved');
                }
            })
    });

    // dismiss scraped article

    app.delete('/dismiss/:id', function (req, res) {
        Article.findByIdAndUpdate(req.params.id,
            { $set: { deleted: true } },
            { new: true },
            function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500);
                } else {
                    res.redirect('/');
                }
            });
    });

    // saving an article
    app.post('/save/id:', function (req, res) {
        Article.findByIdAndUpdate(req.params.id, {
            $set: { saved: true }
        },
            { new: true },
            function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500);
                } else {
                    res.redirect('/');
                }

            });
    });

    // getting saved articles
    app.get('/saved', function (req, res) {
        Article
            .find({})
            .where('saved').equals(true)
            .where('deleted').equals(false)
            .populate('notes')
            .exec(function (error, docs) {
                if (error) {
                    console.log(error);
                    res.status(500);
                }
            })
    })

    // getting all the articles to display
    app.get('/getarticles', function (req, res) {
        Article.find({}).exec(function (error, data) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(data)
                res.json(data)
            }

        })

    })



}