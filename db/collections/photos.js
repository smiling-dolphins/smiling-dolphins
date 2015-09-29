var db = require('../config');
var Promise = require('bluebird');
// require needed model(s)
require('..models/user');
require('..models/trip');
require('../models/photo');

// db.Collection.extend
var Photos = db.Collection.extend({
  model: db.model('Photo')
  }, {
  // Photos collection methods:
  fetchByUser: function(userId){
    return db.collection('Photos')
    .forge()
    .query(function(qb){
      qb.where('user_id', '=', userId);
    })
    .fetch();
  },
  fetchByTrip: function(tripId, userId){
    return db.collection('Photos')
    .forge()
    .query(function(qb){
      qb.where('trip_id', '=', tripId).andWhere('user_id', '=', userId);
    })
    .fetch();
  }
});

module.exports = db.collection('Photos', Photos);
