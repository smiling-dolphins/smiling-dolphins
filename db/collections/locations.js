var db = require('../config');
var Promise = require('bluebird');
// require needed model(s)
require('../models/location');

// db.Collection.extend
var Locations = db.Collection.extend({
  model: db.model('Location')
  }, {
  // Location collection methods:

});

module.exports = db.collection('Locations', Locations);
