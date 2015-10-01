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

app.listen(process.env.PORT || 8000);
console.log("Listening on port 8000...")