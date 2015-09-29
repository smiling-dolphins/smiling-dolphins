var db = require('../config');
var Promise = require('bluebird');

var Photo = db.Model.extend({
  // Photo properties:
  tableName: 'photos'

  }, {
  // Photo methods:

});

module.exports = db.model('Photo', Photo);
