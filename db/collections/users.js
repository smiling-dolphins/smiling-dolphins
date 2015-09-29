var db = require('../config');
var Promise = require('bluebird');

// require needed model(s)
require('../models/user');

// db.Collection.extend
var Users = db.Collection.extend({
  model: db.model('User')
  }, {
	// Users collection methods:
  fetchAll : function (){
  	return db.collection('Users').forge().fetchAll();
  }
  });

  module.exports = db.collection('Users', Users);
