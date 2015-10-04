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
          
          scope.$on('profile-updated', function(event, profileObj) {
          var markers = [];
          mapService.trip.photos.forEach(function(e){
            var icon = new google.maps.MarkerImage(e.url, null, null, new google.maps.Point(0, 64), new google.maps.Size(30, 30));          
              var myLatlng = new google.maps.LatLng(e.lat,e.lng);
                var mark = new google.maps.Marker({
                          position: myLatlng, 
                          map: map,
                          icon:icon,
                          title: mapService.trip.name,
                          animation: google.maps.Animation.DROP
                });
                mark.picture = e.url
                mark.addListener('click', function(marker) {
                  mapService.mark = mark;
                  open('lg');
                });
                markers.push(mark);
                mark.setMap(map);
              });

        var bounds = new google.maps.LatLngBounds();
          for(i=0;i<markers.length;i++) {
           bounds.extend(markers[i].getPosition());
          }
          map.fitBounds(bounds);
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
