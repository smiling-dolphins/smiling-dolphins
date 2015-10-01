var db = require('../db/config');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var Promise = require('bluebird');
var passport = require("passport");

require('../db/models/user');
require("../db/models/trip");
require("../db/models/photo");

var app = express();
var server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./passport.js")(passport)

//Required for Passport
var session = require("express-session");
app.use(session({ secret: 'Frowning Dolphins' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/../client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.sendFile('/index.html');

// Handle the Index Page
// Pull all Trip data of all users w/ associated photos from db to post on page

});
//Direct to Instagram Login
app.get('/auth/instagram',
  passport.authenticate('instagram'));

//Redirect Back to Home Page upon Authentication
app.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.post('/api/trip', function (req, res) {
  console.log('req:', req.body);

  var tripName = req.body.name;
  db.model('Trip').newTrip({name: tripName}).save();

  var instaResults = []
  var feed = new Instafeed({
    get: 'user',
    userId: 273734145,
    accessToken: '22125417.d904cd4.44abd06ef59d43e5b0fc7e9b4f347ebb',
    filter: function(image) {
      if(image.tags.indexOf(tripName) >= 0){
        instaResults.push(image);
        console.log(instaResults);
        return true;
      }
    },
    links: true,
    limit: 34,
    target: 'instafeed',
    sortBy: 'most-recent',
    resolution: 'standard_resolution',
    useHttp: true,
  });

  feed.run();


  // create a new trip & send Instafeed post request for user
  // filter for newTrip tag we just created
  // add photos to the db with associated trip Id




});

app.listen(process.env.PORT || 8000);
console.log("Listening on port 8000...")