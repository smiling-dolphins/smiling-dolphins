var db = require('../config');
var Promise = require('bluebird');

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
  fetchById: function(id) {
    return new this({
      id: id
    }).fetch({withRelated:['trips', 'photos']});
  },
  fetchByUsername: function(username) {
    return new this({
      username: username 
    }).fetch({withRelated:['trips', 'photos']});
  },
  newUser: function(options) {
    return new this(options);
  }
    
  }); user.fetchByusername().then(function(data){})

module.exports = db.model('User', User);
