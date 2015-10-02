angular.module('Map', [])
  .controller('MapController', MapController)
  .directive('mapDir', mapDir);


MapController.inject = ['$http', 'Fetcher'];
function MapController($http, Fetcher){
  var self = this;
  self.currentTrip = Fetcher.currentTrip;
  self.photos = self.currentTrip.photos;
  console.log(self.currentTrip);
}

function mapDir(){
  return {
    restrict: 'E',
    templateUrl: '/map/map.html',
    replace: true,
    controller: 'MapController',
    controllerAs: 'mapCtrl',
    bindToController: true
  }
}
// need this onclick for each thumbnail on the map, need to know how to access Lightbox:
// <a ng-click="Lightbox.openModal(images, $index)">