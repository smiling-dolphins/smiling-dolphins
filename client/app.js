angular.module('venshurApp', [
  'ngRoute',
  'venshurServices',
  'Header',
  'Trips',
  'Map',
  'PhotoView'
])
.run()
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: "index.html"
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
