angular.module('Map', [])
  .controller('MapController', MapController)
  .directive('mapDir', function(){
    return {
      restrict: 'E',
      templateUrl: '/map/map.html',
      replace: true,
      controller: 'MapController',
      controllerAs: 'mapCtrl',
      bindToController: true
    }
  });


MapController.inject = ['$http'];
function MapController($http){
  var self = this;
  // $http - serve photos and their coords
  // make markers & fit all on the map
  // compose a map query string to insert into img tag
}

// method to fit all markers on the map:
// //  Make an array of the LatLng's of the markers you want to show
// var LatLngList = new Array (new google.maps.LatLng (52.537,-2.061), new google.maps.LatLng (52.564,-2.017));
// //  Create a new viewpoint bound
// var bounds = new google.maps.LatLngBounds ();
// //  Go through each...
// for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
//   //  And increase the bounds to take this point
//   bounds.extend (LatLngList[i]);
// }
// //  Fit these bounds to the map
// map.fitBounds (bounds);