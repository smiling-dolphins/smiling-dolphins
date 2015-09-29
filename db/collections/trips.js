var db = require('../config');
var Promise = require('bluebird');
// require needed model(s)
require('../models/trip');

// db.Collection.extend
var Trips = db.Collection.extend({
  model: db.model('Trip')
  }, {
  // Trips collection methods:

});

module.exports = db.collection('Trips', Trips);
