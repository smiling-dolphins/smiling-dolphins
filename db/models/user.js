var db = require('../config');
var Promise = require('bluebird');

require('./trip');
require('./photo');

var User = db.Model.extend({
  // User properties:
  tableName: 'users',
  trips: function() {
    return this.hasMany('Trip');
  },
  photos: function(){
    return this.hasMany('Photo');
  }
},{
  //Model methods
  fetchById: function(options) {
    return new this(options).fetch({withRelated:['trips', 'photos']});
  },
  fetchByUsername: function(username) {
    return new this({
      username: username
    }).fetch({withRelated:['trips', 'photos']});
  },
  newUser: function(options) {
    return new this(options);
  }
});

module.exports = db.model('User', User);
