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
  self.trips = [{id: 1, user: {username: "Justin"}, name: "SantaMonica", photos: [{url: "https://igcdn-photos-f-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/s640x640/sh0.08/e35/11939702_534947459994517_1867211008_n.jpg", thumb: "", lat: 34.0104257, lng: -118.4959495}, {url: "https://scontent-sjc2-1.cdninstagram.com/hphotos-xfa1/t51.2885-15/s640x640/sh0.08/e35/11934845_431928813662135_2052839130_n.jpg", thumb: "", lat: 34.02252, lng: -118.4770668}, {url: "https://scontent-sjc2-1.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11917806_1180732428603540_1216480217_n.jpg", thumb: "", lat: 34.0243801, lng: -118.4733777}]}, {id: 2, user: {username: "Chris"}, name: "SanDiego"}, {id: 3, user: {username: "Jeff"}, name: "MojaveDesert"}, {id: 4, user: {username: "Tommy"}, name: "HongKong"}];

  // self.trips = Fetcher.getTrips();
  self.trip;

  self.setTrip = function(index){
    self.trip = self.trips[index];
    alert("clicked");
    console.log(self.trip);
  }

  self.addTrip = function(tripData){
    // send $http to POST trip
    // .then(function(response){
       // self.trip = response.data;
    // })
  alert("add button clicked!");
  }
}