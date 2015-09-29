var db = require('../config');
var Promise = require('bluebird');
require('./user');
require('./trip');

var Photo = db.Model.extend({
  // Photo properties:
  tableName: 'photos',
  user: function(){
    return this.belongsTo('User');
  },
  trip: function(){
    return this.belongsTo('Trip');
  }

}, {
  // Photo methods:
  fetchById: function(id){
    return new this({
      id: id
    }).fetch({
      withRelated: ['user', 'trip']
    });
  },
  newPhoto: function(options){
    return new this(options);
  }
});

module.exports = db.model('Photo', Photo);
