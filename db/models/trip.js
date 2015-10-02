var db = require('../config');
var Promise = require('bluebird');

require('./user');
require('./photo');

var Trip = db.Model.extend({
  // Trip properties
  tableName: 'trips',
  hasTimestamp: true,
  user: function() {
    return this.belongsTo('User');
  },
  photos: function() {
    return this.hasMany('Photo');
  }
}, {
  // Trip methods:
  fetchById: function(id) {
    return new this({
      id: id
    }).fetch({
      withRelated: ['user', 'photos']
    })
  },
  // newTrip
  newTrip: function(options) {
    return new this(options);
  }
});

module.exports = db.model('Trip', Trip);