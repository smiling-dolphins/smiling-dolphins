angular.module('Trips', [])
  .controller('TripsController', TripsController)
  .directive('tripsDir', function(){
    return {
      restrict: 'E',
      templateUrl: '/trips/trips.html',
      replace: true,
      controller: 'TripsController',
      controllerAs: 'tripsCtrl',
      bindToController: true
    }
  });

TripsController.inject = ['$http', 'Fetcher'];
function TripsController($http, Fetcher){
  var self = this;
  self.trips = [{user: "Justin", name: "Vegas"}, {user: "Chris", name: "SanDiego"}, {user: "Jeff", name: "MojaveDesert"}, {user: "Tommy", name: "HongKong"}];

  // self.trips = Fetcher.getTrips();
  // self.trip;

  // self.addTrip = function(tripData){
  //   // send $http to POST trip
  //   // .then(function(response){
       // self.trip = response.data;
  // })
  // }
}