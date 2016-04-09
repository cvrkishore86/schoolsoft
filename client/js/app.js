var app = angular.module('app', ['ui.router','lbServices','jcs-autoValidate']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
     .state('home', {
        url: '/home',
        templateUrl: 'modules/login/login.html',
        controller: 'AuthLoginController',
        authenticate: true
      })
      .state('createstudent', {
        url: '/createstudent',
        templateUrl: 'modules/student/student.html',
        controller: 'StudentCreateController',
        authenticate: true
      }).state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('studentlist', {
        url: '/studentlist',
        templateUrl: 'modules/student/students.html',
        controller: 'StudentListController',
        authenticate: true
      });
    $urlRouterProvider.otherwise('home');
  }])
  ;



