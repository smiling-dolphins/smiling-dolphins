angular.module('venshurApp', [
  'ngRoute',
  'venshurServices',
  'Header',
  'Trips',
  'Map',
  'PhotoView'
])
.run(['Auth', function(Auth){
  Auth.checkAuth();
}])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: "index.html"
    })
    .when('/auth/instagram', {
      templateUrl: "index.html",
      redirect: false
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
