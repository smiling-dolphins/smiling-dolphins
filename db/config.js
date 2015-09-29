var Promise = require('bluebird');

var dbOptions = {
  client: process.env.dbClient || 'postgres',
  connection: {
    host: process.env.dbHost || '127.0.0.1',
    user: process.env.dbUser || 'root',
    password: process.env.dbPassword || '',
    database: process.env.dbDatabase || 'venshurDB',
    charset: 'utf8'
  }
};

var knex = require('knex')(dbOptions);

module.exports = db = require('bookshelf')(knex);

db.plugin('registry');

var buildTable = function(name, callback) {
  return db.knex.schema.hasTable(name)
  .then(function(exists) {
    if (exists) {
      return { name: name, created: false };
    } else {
      return db.knex.schema.createTable(name, callback);
    }
  })
  .then(function(response) {
    if (!response.name) {
      qb = response;
      if (qb) {
        return { name: name, created: true };
      } else {
        return { name: name, created: false };
      }
    } else { return response; }
  });
};

var users = buildTable('users', function(table){
  table.increments('id').primary();
  table.string('username').unique();
  table.string('instagram_id');
});

var trips = buildTable('trips', function(table){
  table.increments('id').primary();
  table.string('name').notNullable();
  table.integer('user_id');
});

var photos = buildTable('photos', function(table){
  table.increments('id').primary();
  table.string('url');
  table.string('thumb_url');
  table.float('lat').notNullable();
  table.float('lng').notNullable();
  table.integer('trip_id');
  table.integer('user_id');
});

var tables = [users, trips, photos];

Promise.all(tables)
.then(function(tables) {
  tables.forEach(function(table) {
    if (table.created) {
      console.log('Bookshelf: created table', table.name);
    } else {
      console.log('Bookshelf:', table.name, 'table already exists');
    }
  });
});
