var db = require('../db/config');
var http = require('http');
var express = require('express');
var Promise = require('bluebird');

var app = express();

app.use(express.static(__dirname + '/../client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.sendFile('/index.html');
});

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
app.listen(process.env.PORT || 3000);
console.log("Listening...")