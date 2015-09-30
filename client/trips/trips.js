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


TripsController.inject = ['$http'];
function TripsController($http){
  var self = this;
  self.trips = [{user: "Justin", name: "Vegas"}, {user: "Chris", name: "SanDiego"}, {user: "Jeff", name: "MojaveDesert"}, {user: "Tommy", name: "HongKong"}];

  // $http
}