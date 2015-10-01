angular.module('venshurApp', [
  'venshurServices',
  'Header',
  'Trips',
  'Map'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/index");

  $stateProvider
    .state('index', {
      url: "/index",
      templateUrl: "index.html"
    });
    // .state('header', {
    //   url: "/header",
    //   templateUrl: "header/header.html"
    // });
    // .state('state2.list', {
    //   url: "/list",
    //   templateUrl: "partials/state2.list.html",
    //   controller: function($scope) {
    //     $scope.things = ["A", "Set", "Of", "Things"];
    //   }
    // });
}]);
