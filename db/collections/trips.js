var db = require('../config');
var Promise = require('bluebird');
// require needed model(s)
require('../models/trip');
require('../models/trip');

// db.Collection.extend
var Trips = db.Collection.extend({
  model: db.model('Trip')
  }, {
  // Trips collection methods:
  fetchByUser: function(userId) {
    return db.collection('Trips')
    .forge()
    .query(function(qb) {
      qb.where('user_id', '=', userId);
    })
    .fetch();
  },
  fetchAll: function() {
    return db.collection('Trips').forge().fetchAll();
  }
});

module.exports = db.collection('Trips', Trips);