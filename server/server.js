var db = require('../db/config');
var express = require('express');
var bodyParser = require('body-parser');
var User = require('..db/models/user');
var Trip = require("..db/models/trip");
var Photo = require("..db/models/photo");
var passport = require("passport");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("/passport.js")(passport)

//Required for Passport
app.use(express.session({ secret: 'Frowning Dolphins' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/client"));

app.get("/", function (req, res) {
// Handle the Index Page
// Pull all Trip data of all users w/ associated photos from db to post on page

})
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
  var tripName = req.body.name;
  var newTrip = Trip();
  newTrip.name = tripName;
  //create a new trip & send Instafeed post request for user
  // filter for newTrip tag we just created
  // add photos to the db with associated trip Id




});

app.listen(8000);
console.log("listening on Port 8000...")
// USERS:

  // GET 1 user (with trips)

  // POST 1 user


// TRIPS:

  // GET all trips (with users)

  // GET 1 trip (with photos)

  // POST 1 trip:
    // call instafeed
    // save tag(trip name) & photos(with user & trip IDs) data to our DB
    // respond with OK
    // return trip/photos data ???
