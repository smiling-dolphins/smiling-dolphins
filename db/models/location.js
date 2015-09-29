var db = require('../config');
var Promise = require('bluebird');

var Location = db.Model.extend({
  // Location properties:
  tableName: 'locations'
  
  }, {
  // Location methods:

});

module.exports = db.model('Location', Location);
