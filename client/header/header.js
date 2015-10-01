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

var pics = [
  "http://www.confiscatedtoothpaste.com/wp-content/uploads/2014/05/Monument-Valley-Panorama-after-post-processing-this-is-how-it-looked_resize.jpg",
  "https://italianrentalblog.files.wordpress.com/2013/10/123083032.jpg?w=1200",
  "http://dsphotographic.com/blog/wp-content/uploads/croatia-10.jpg",
  "https://content.trafalgar.com/~/media/images/home/destinations/europe-and-britain/france/paris-tours-panorama-sunset.jpg?mw=1200&",
  "http://www.gg-group.net/template/en/definitions/img/header-travel.jpg",
  "http://dsphotographic.com/blog/wp-content/uploads/midlands-30.jpg",
  "http://cdnx.jetcdn.com/static/dimg/rlWgMKEuMTS0LFV6rlWmnKcyVwc7VaqcMUEbVwbkZwNjYPWbMJyanUDvBwLjZU19YPWjLKEbVwbvnJ1uM2ImY3Olo2E1L3DipUWipTIlqTyypl9yMTy0o3WcLJklMKMcMKqmYmx0AwHipTquoP0lBGD5Zv0kZmN4ZQt3AQH3YKAlLl5dpTpvYPW2MKWmnJ9hVwbvVa0",
  "http://dsphotographic.com/blog/wp-content/uploads/india-01.jpg",
  "http://www.99adventure.com/wp-content/uploads/2015/06/99asventure-molveno-panorama-1200x600.jpg",
  "http://www.lawsonphoto.us/wp-content/uploads/2011/07/smalljokulsarlon_Panorama1_print.jpg",
  "http://www.slotrips.si/sis-mapa/skupina_doc/slo/galerija/1332185422_3367_panorama5.jpg",
  "http://3.bp.blogspot.com/-_V6Txl3m4Kc/VZH_e5H3TQI/AAAAAAAAAq0/tTD3TNBfGp0/s1600/HC%2BPano%2B2.jpg",
  "http://www.allroadsnorth.com/wp-content/uploads/2015/03/The-T.A.-Moulton-Barn-in-the-Tetons-1200x600.jpg",
  "http://www.pider.info/files/gallery/thumbs/5f58dc14bb7a1e07b505c496d836a276_1200x600.jpg",
  "http://www.coriobaycameraclub.org.au/wp-content/uploads/2012/12/05.-Rising-sun1.jpg",
  "http://filer.livinginperu.com/travel/Pelicans.jpg"
];

HeaderController.inject = ['$http', 'Fetcher'];
function HeaderController($http, Fetcher){
  var self = this;
  self.bgnd;
  self.randomBackground = function(){
    var index = Math.floor(Math.random()*pics.length);
    self.bgnd = pics[index];
  };
}
