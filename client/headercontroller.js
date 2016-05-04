angular
  .module('app')
  .controller('HeaderController', ['$scope','$state','$rootScope',
      function($scope, $state, $rootScope) {
        if ($rootScope.isCollapsed == null) {
        $rootScope.isCollapsed = true;
     }
     

     $scope.togglemenu = function(key) {
      $rootScope[key] = !$rootScope[key];
     }
  }])
