
angular.module('Trips', [])
  .controller('TripsController', TripsController)
  .directive('tripsDir', function(){
    return {
      restrict: 'E',
      templateUrl: '/trips/trips.html',
      replace: true,
      controller: 'TripsController',
      controllerAs: 'tripsCtrl',
      bindToController: true,
    }
  });
  
TripsController.inject = ['$http', 'Fetcher','$scope','Auth'];

function TripsController($http, Fetcher,$scope,Auth){
  var self = this;
  self.hashtag;
  self.getTrips = Fetcher.getTrips;
  self.trips = Fetcher.trips || Fetcher.getTrips();
  self.currentTrip = Fetcher.currentTrip;
  self.isAuth = Auth.getAuth();
  self.setTrip = function(index){
    self.currentTrip = Fetcher.setCurrentTrip(self.trips[index]);
    $scope.$emit('profile-updated', {currentTrip:self.currentTrip});
  }

  self.addTrip = function(){
    $http({
      method: 'POST',
      url: 'api/trips',
      data: {trip: {name: self.hashtag}}
    })
    .then(function(response){
       self.getTrips();
       self.setTrip(response.data);
    })
    .catch(function(err){
      console.error(err);
    });
  }
}