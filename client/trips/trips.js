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

  self.getTrips = Fetcher.getTrips;
  self.trips = Fetcher.trips || Fetcher.getTrips();
  self.currentTrip = Fetcher.currentTrip;

  self.setTrip = function(index){
    self.currentTrip = Fetcher.setCurrentTrip(self.trips[index]);
    console.log(self.currentTrip);
  }

  self.addTrip = function(tripData){
    // send $http to POST trip
    // .then(function(response){
       // self.trip = response.data;
    // })
  alert("add button clicked!");
  }
}