// Routing
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var request = require('superagent');
var gplay = require('google-play-scraper');


// Set logger
app.use(logfmt.requestLogger());

// Routes definitions
var routes = {
	root: '/',
	app: '/app/:appID'
}

// API response headers
var apiHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
	'Access-Control-Allow-Headers': 'Content-Type'
}

// Routing Root
app.get(routes.root, function(req, res) {
	var warningString = "Usage: /app/:appid"+ " <br/>"+" Example: /app/com.meetsapp";
	warningString += "<br />Usage: /search/:appName"+ " <br/>"+" Example: /search/meetsapp";
	res.send(warningString);
});

// Routing App
app.get('/app/:appID&lang=:lang', function(req, res) {


gplay.app(req.params.appID, req.params.lang)
  .then(function(app){
 res.json(app)
  })

});

app.get('/search/:queryStr&num=:num', function(req, res) {

gplay.search({
    term: req.params.queryStr,
    num: req.params.num,
    country: 'id',
    fullDetail: false
  }).then(function(app){
 res.json(app)
  })

});

// Developer
app.get('/dev/:devID&num=:num', function(req, res) {

gplay.developer({
	devId: req.params.devID,
	num: req.params.num
  }).then(function(app){
 res.json(app)
  })

});


// Initialize
var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
	console.log("Listening on " + port);
});
