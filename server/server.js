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

require('../db/collections/users');
require("../db/collections/trips");
require("../db/collections/photos");

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

app.get('/api/auth', function (req, res){
  if(req.user){
    res.json(req.user.toJSON());
  }
});

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
        res.redirect( '/' );
      });
    })(req, res, next);
  //   res.json({name: 'jeff'});
});

app.get('/api/logout', function(req, res){
  req.session.destroy();
  req.logout();
  res.send('200');
});
// app.param()
app.get('/api/trip/:id', function(req, res){
  var tripId = req.params.id;
  console.log("this is the id: ", tripId);
  db.model('Trip').fetchById(tripId).then(function(trip){
    console.log(trip);
    res.json(trip.toJSON());
  });
});

app.get('/api/trips', function (req, res, next){
  db.collection('Trips')
  .fetchAll()
  .then( function(data) {
    res.json({ data: data.toJSON() }); // need to strip insta ID
  });
});

app.post('/api/trips', function (req, res) {
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

app.listen(process.env.PORT || 8000);
console.log("Listening on port 8000...")