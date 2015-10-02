angular.module('PhotoView', ['bootstrapLightbox'])
  .config(function (LightboxProvider) {
    // set a custom template
    LightboxProvider.templateUrl = 'photo.html';

    // img size:
    LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
      return {
        'maxWidth': 500,
        'maxHeight': 500
      };
    };
    // modal size:
    LightboxProvider.calculateModalDimensions = function (dimensions) { 
      return {
        'width': 'auto',
        'height': 'auto'
      };
    };
  });

angular.module('PhotoView')
  .controller('PhotoViewController', PhotoViewController);

PhotoViewController.inject = ['Lightbox', 'Fetcher'];
function PhotoViewController (Lightbox, Fetcher) {
  var self = this;
  self.Lightbox = Lightbox;
  self.currentTrip = Fetcher.currentTrip;
  self.images = self.currentTrip.photos.map(function(img){
    return img.url;
  });
}
