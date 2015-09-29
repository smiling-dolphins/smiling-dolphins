var db = require('../config');
var Promise = require('bluebird');

var Trip = db.Model.extend({
  // Trip properties
  tableName: 'trips'

  }, {
  // Trip methods:

});

module.exports = db.model('Trip', Trip);
