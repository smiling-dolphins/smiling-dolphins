angular.module('Map',[])
  .controller('MapController', MapController)
  .directive('mapDir', mapDir);
 
function MapController($scope,mapService,Fetcher) {
  var self = this;
  $scope.mark = mapService.mark;
}

function mapDir($modal,$log,mapService){
  return {
    restrict: 'E',
    templateUrl: '/map/map.html',
    replace: true,
    controller: 'MapController',
    controllerAs: 'mapCtrl',
    bindToController: true,
    link: function(scope, elem, attrs) {
      var mapOptions,
        latitude = attrs.latitude,
        longitude = attrs.longitude,
        map;
        latitude = latitude && parseFloat(latitude, 10) || 43.074688;
        longitude = longitude && parseFloat(longitude, 10) || -89.384294;
        mapOptions = {
          zoom: 2,
          center: new google.maps.LatLng(latitude, longitude)
        };
        map = new google.maps.Map(elem[0], mapOptions);
          
          var markers = [];
          scope.$on('profile-updated', function(event, profileObj) {
          console.log('the markers mapside ',mapService.markers);
          mapService.eraseMarkers(markers);
          mapService.addMarkers(mapService.trip,map)
    });

  var animationsEnabled = true;

  var open = function (size) {

      modalInstance = $modal.open({
      animation: animationsEnabled,
      templateUrl: '/map/modal.html',
      controller: 'MapController',
      size: 'lg'
    });

    modalInstance.result.then(function (selectedItem) {
      var selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  var toggleAnimation = function () {
    animationsEnabled = !animationsEnabled;
  };

  }
};
}
