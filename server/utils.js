var https = require('https');
var Promise = require('bluebird');

require("../db/models/trip");
require("../db/models/photo");

var promiseGet = function(instagramUrl, tripName) {
  return new Promise(function(resolve, reject) {
    var get = https.get(instagramUrl, function(response) {
      var instaData = '';
      response.on('data', function(data) {
        instaData += data;
      });
      // Resolve the promise when the response ends
      response.on('end', function() {
        resolve({
          instaData: instaData,
          tripName: tripName
        });
      });
    });
    // Handle errors
    get.on('error', function(error) {
      console.log('Problem with request:', error.message);
      reject(error);
    });
  });
};

var getCallback = function(data) {
// Formats the blob of JSONs that Instagram API sends back
// with just the data we care about
  var instaData = data.instaData;
  var tripName = data.tripName;
  var results = [];
  JSON.parse(instaData).data.forEach(function(imageObject) {
    // since Instagram also has video
    if (imageObject.type === 'image') {
      imageObject.tags.forEach(function(tag) {
        if (tag === tripName) {
          var imageObjectFormatted = {};
          imageObjectFormatted.url = imageObject.images.standard_resolution.url;
          imageObjectFormatted.thumbUrl = imageObject.images.thumbnail.url;
          imageObjectFormatted.lat = imageObject.location.latitude;
          imageObjectFormatted.lng = imageObject.location.longitude;
          results.push(imageObjectFormatted);
        }
      })
    };
  });
  return results;
};

var instaGet = function(instagramId, tripName) {
  var baseUrl = 'https://api.instagram.com/v1/users/';
  var urlMid = '/media/recent/?access_token=';
  // note: change this to use logged in user's access token instead of this one
  var accessToken = '22125417.d904cd4.44abd06ef59d43e5b0fc7e9b4f347ebb';
  var count = '&count=50';
  var instagramUrl = baseUrl + instagramId + urlMid + accessToken + count;
  return promiseGet(instagramUrl, tripName)
        .then(getCallback)
        .catch(function(err) {
          console.error("Error in promiseGet chain:", err);
        });
}

var instaSave = function(req, tripId, instaResults) {
  var photos = instaResults.map(function (photoObj) {
    // check if we already have that photo in our database
    db.model('Photo').newPhoto({
      url: photoObj.url
    }).fetch()
    .then(function(photoModel) {
      if (!photoModel) {
        db.model('Photo').newPhoto({
          url: photoObj.url,
          thumb_url: photoObj.thumbUrl,
          lat: photoObj.lat,
          lng: photoObj.lng,
          trip_id: tripId,
          user_id: req.user.attributes.id,
        }).save()
        .then(function (photo) {
          console.log('ADDED PHOTO:', photo.toJSON());
          return photo;
        })
        .catch(function(err) {
          console.error('Error in saving to photos table:', err);
        });
      }
      if (photoModel) {
        console.log('Photo already in database');
        return photoModel;
      }
    })
    .catch(function(err) {
      console.error('Error in instaSave', err);
    });
  });

  return Promise.all(photos)
  .then(function() {
    return db.model('Trip').fetchById(tripId);
  })
  .catch(function(err) {
    console.error('Error ', err);
  });
};

module.exports.postTrips = function (req, res, tripName) {
  console.log('req.body', req.body);
  console.log('req.user', req.user);
  var tripName = req.body.trip.name;
  var instagramId = req.user.attributes.instagram_id;

  var tripId = db.model('Trip').newTrip({
    name: tripName
  }).fetch()
  .then(function(trip) {
    if (!trip) {
      return db.model('Trip').newTrip({
        name: tripName,
        user_id: req.user.id
      }).save();
    } else {
      return trip;
    }
  })
  .then(function(trip) {
    return trip.get('id');
  })
  .catch(function(err) {
    console.error("Error with creating/retrieving Trip:", err);
  });

  var instaResults = instaGet(instagramId, tripName)
  .then(function(results) {
    return results;
  })
  .catch(function(err) {
    console.error('Error in responding to instaGet:', err);
  });

  Promise.join(tripId, instaResults, function (tripId, instaResults) {
    instaSave(req, tripId, instaResults)
    .then(function(photos) {
      console.log('This is photos.toJSON():', photos.toJSON());
      res.send(photos.toJSON());
    })
    .catch(function(err) {
      console.error('Error in instaSave and sending photos response:', err);
    });
  })
  .catch(function(err) {
    console.error('Error in Promise.join:', err);
  });
};
