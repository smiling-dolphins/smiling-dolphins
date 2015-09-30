angular.module('Header', [])
  .controller('HeaderController', HeaderController)
  .directive('headerDir', function(){
    return {
      restrict: 'E',
      templateUrl: '/header/header.html',
      replace: true,
      controller: 'HeaderController',
      controllerAs: 'headerCtrl',
      bindToController: true
    }
  });


HeaderController.inject = ['$http', 'Fetcher'];
function HeaderController($http, Fetcher){
  var self = this;
}
