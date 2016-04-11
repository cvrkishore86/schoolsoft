angular.module('app', ['ImageCropper'])
        .controller('MainController', function($scope) {
          $scope.imageCropResult = null;
          $scope.imageCropResult2 = null;

          $scope.showImageCropper = false;
          $scope.showImageCropper2 = false;

          $scope.$watch('imageCropResult', function(newVal) {
            if (newVal) {
              console.log('imageCropResult', newVal);
            }
          });

          $scope.$watch('imageCropResult2', function(newVal) {
            if (newVal) {
              console.log('imageCropResult2', newVal);
            }
          });

        });