angular.module('venshurServices', [])
  .factory('Fetcher', Fetcher)
  .factory('Auth', ['$window', '$rootScope', '$q', '$http', Auth])
  .factory('mapService', mapservice);

function Fetcher ($http,mapService) {
var trips = [];
var currentTrip = {};

  var setCurrentTrip = function(trip){
    for(var key in trip){
      currentTrip[key] = trip[key];
    }
    mapService.trip = currentTrip;
    return currentTrip;
  }

  var getTrips = function(){
    return $http({
      method: 'GET',
      url: '/api/trips'
    })
    .then(function (response) {
      // console.log('response from getTrips Fetcher: ', response);
      response.data.data.forEach(function(item, index){
        trips[index] = item;
      });
    })
    .catch(function(err){
      console.log('err from getTrips Fetcher: ', err);
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

function Auth ($window, $rootScope, $q, $http){
  function getAuth(){
    var userProfile = $window.localStorage.getItem('userProfile');
    if (!userProfile) {
      userProfile = { authenticated: false };
      var toStore = JSON.stringify(userProfile)
      $window.localStorage.setItem('userProfile', toStore);
    }
    $window.localStorage.userProfile.authenticated = userProfile.authenticated;
    return userProfile.authenticated;
  }

  function checkAuth(){
    return $http({
      method: 'GET',
      url: '/api/auth'
    })
    .then(function(response){
      var userProfile = $window.localStorage.getItem('userProfile') || {};
      console.log("PARSED: ", JSON.parse(userProfile));
      var parsed = JSON.parse(userProfile);
      for(var key in response.data){
        parsed[key] = response.data[key];
        parsed.authenticated = true;
      };
      $window.localStorage.setItem('userProfile', JSON.stringify(parsed));
    }, function(response){
      console.log('error response: ', response.status, response.data);
    });
  }

  function logout(){
   return $http({
     method: 'GET',
     url: '/api/logout'
   })
   .then(function(response){
     $window.localStorage.removeItem('userProfile');
     checkAuth();
   });
 }

 return {
   getAuth: getAuth,
   checkAuth: checkAuth,
   logout: logout
 }
}

function mapservice(){
  var mark,modalInstance,trip;

  return {
    trip:trip,
    mark:mark,
    modalInstance:modalInstance,
  };
}
