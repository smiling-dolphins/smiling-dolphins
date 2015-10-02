angular.module('venshurServices', [])
  .factory('Fetcher', Fetcher)
  .factory('Auth', Auth);

var trips = [];

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
      response.data.data.forEach(function(item, index){
        trips[index] = item;
      });
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