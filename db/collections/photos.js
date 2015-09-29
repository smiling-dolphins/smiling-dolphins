var db = require('../config');
var Promise = require('bluebird');
// require needed model(s)
require('../models/photo');

// db.Collection.extend
var Photos = db.Collection.extend({
  model: db.model('Photo')
  }, {
  // Photos collection methods:

});

module.exports = db.collection('Photos', Photos);
