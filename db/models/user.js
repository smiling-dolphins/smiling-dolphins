var db = require('../config');
var Promise = require('bluebird');

var User = db.Model.extend({
  // User properties:
  tableName: 'users'
  
  }, {
  // User methods:

});

module.exports = db.model('User', User);
