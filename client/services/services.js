angular.module('venshurServices', [])
  .factory('Fetcher', Fetcher)
  .factory('Auth', Auth);

function Fetcher ($http) {
  var getTrips = function(){
    return $http({
      method: 'GET',
      url: '/api/trips'
    })
    .then(function (response) {
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
    getTrips: getTrips,
    getTrip: getTrip
  }
}

function Auth (){
  // check if user is authorised
}