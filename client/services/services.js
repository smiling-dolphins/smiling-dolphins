angular.module('venshurServices', [])
  .factory('Fetcher', Fetcher)
  .factory('Auth', Auth);

var trips = [
{id: 1, user: {username: "Justin"}, name: "SantaMonica", photos: [{url: "https://igcdn-photos-f-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/s640x640/sh0.08/e35/11939702_534947459994517_1867211008_n.jpg", thumb: "http://placehold.it/150x150", lat: 34.0104257, lng: -118.4959495}, {url: "https://scontent-sjc2-1.cdninstagram.com/hphotos-xfa1/t51.2885-15/s640x640/sh0.08/e35/11934845_431928813662135_2052839130_n.jpg", thumb: "http://placehold.it/150x150", lat: 34.02252, lng: -118.4770668}, {url: "https://scontent-sjc2-1.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11917806_1180732428603540_1216480217_n.jpg", thumb: "http://placehold.it/150x150", lat: 34.0243801, lng: -118.4733777}]}, 
{id: 2, user: {username: "Chris"}, name: "SanDiego", photos: [{url: "https://scontent-sjc2-1.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11917806_1180732428603540_1216480217_n.jpg", thumb: "http://placehold.it/150x150", lat: 34.0243801, lng: -118.4733777}]}, 
{id: 3, user: {username: "Jeff"}, name: "MojaveDesert", photos: [{url: "https://scontent-sjc2-1.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11917806_1180732428603540_1216480217_n.jpg", thumb: "http://placehold.it/150x150", lat: 34.0243801, lng: -118.4733777}, {url: "https://scontent-sjc2-1.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11917806_1180732428603540_1216480217_n.jpg", thumb: "http://placehold.it/150x150", lat: 34.0243801, lng: -118.4733777}]}, 
{id: 4, user: {username: "Tommy"}, name: "HongKong", photos: []}];

var currentTrip = {};

function Fetcher ($http) {

  var setCurrentTrip = function(trip){
    for(var key in trip){
      currentTrip[key] = trip[key];
    }
    return currentTrip;
  }

  var getTrips = function(){
    return $http({
      method: 'GET',
      url: '/api/trips'
    })
    .then(function (response) {
      console.log(response.data); // this logs message fr server!
      return response.data;
    });
  };

  var getTrip = function(tripId){
    return $http({
      method: 'GET',
      url: '/api/trips/' + tripId
    })
    .then(function (response) {
      return response.data;
    });
  };

  return {
    trips: trips,
    currentTrip: currentTrip,
    setCurrentTrip: setCurrentTrip,
    getTrips: getTrips,
    getTrip: getTrip
  }
}

function Auth (){
  // check if user is authorised
}