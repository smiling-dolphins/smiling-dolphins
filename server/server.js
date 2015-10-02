var db = require('../db/config');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var Promise = require('bluebird');
var passport = require("passport");
var morgan = require('morgan');

require('../db/models/user');
require("../db/models/trip");
require("../db/models/photo");

var app = express();
var server = http.Server(app);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Required for Passport
var session = require("express-session");
app.use(session({
  key: 'our project',
  secret: 'Frowning Dolphins',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/../client'));

require("./passport.js")(passport)

app.use(passport.initialize());
app.use(passport.session());

// app.get('/', function (req,res) {
//   res.render('index');
// })
//Direct to Instagram Login
app.get('/auth/instagram',
  passport.authenticate('instagram'));

//Redirect Back to Home Page upon Authentication
app.get('/auth/instagram/callback', function (req, res, next) {
  passport.authenticate('instagram',
  function(err, user, info) {
      if (err) { return next(err); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log('Has the req been logged in??', req.user);
        res.redirect( '/index.html' );
      });
    })(req, res, next);
  //   res.json({name: 'jeff'});
});

// db.model('Photo').newPhoto({
//   url: 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11950735_1642937995984028_1074498518_n.jpg',
//   thumb_url: 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s150x150/e35/c0.135.1080.1080/11875317_118274165193414_119190204_n.jpg',
//   lat: 34.019007538736766,
//   lng: -118.4945547580719,
//   trip_id: 1234,
//   user_id: 1543
// }).save().then(function (photo) {
//   console.log('ADDED PHOTO ',photo.toJSON());
// })


// app.param()
app.get('/api/trip/:id', function(req, res){
  var tripId = req.params.id;
  console.log("this is the id: ", tripId);
  db.model('Trip').fetchById(tripId).then(function(trip){
    console.log(trip);
    res.json(trip.toJSON());
  });
});

app.post('/api/trip', function (req, res) {
  console.log('req:', req.body);

  var tripName = req.body.name;
  db.model('Trip').newTrip({name: tripName}).save();

  instaResults.forEach(function (photo) {
    db.model('Photo').newPhoto({
      url: photo.images.standard_resolution.url,
      thumb_url: photo.thumbnail.url,
      lat: photo.location.latitude,
      lng: photo.location.longitude,
      trip_id: 'id',
      user_id: req.user.attributes.id,
    }).save().then(function (photo) {
      console.log('ADDED PHOTO ',photo.toJSON());
    })
    })
  });


  // create a new trip & send Instafeed post request for user
  // filter for newTrip tag we just created
  // add photos to the db with associated trip Id





app.listen(process.env.PORT || 8000);
console.log("Listening on port 8000...")
