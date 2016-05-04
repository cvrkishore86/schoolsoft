var app = angular.module('app', ['ui.router', 'ui.bootstrap']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
    .state('header', {
        url: '/header',
        templateUrl: 'pages/header.html',
        controller: 'HeaderController',
        authenticate: true
      }).state('partial', {
        url: '/partial',
        templateUrl: 'pages/partial.html',
        controller: 'HeaderController',
        authenticate: true
      }).state('partial2', {
        url: '/partial2',
        templateUrl: 'pages/partial2.html',
        controller: 'HeaderController',
        authenticate: true
      }).state('partial3', {
        url: '/partial3',
        templateUrl: 'pages/partial3.html',
        controller: 'HeaderController',
        authenticate: true
      })
    ;
    $urlRouterProvider.otherwise('header');
  }])
  .run(['$rootScope', '$location','$state',
    function ($rootScope, $location,$state) {
        // keep user logged in after page refresh
	  
	  
	  $rootScope.cssfile = 'sb-admin-2.css';
	  
       $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
    	   $rootScope.currentpage = $state.current.name;
    	   
          
        });
    }]);


