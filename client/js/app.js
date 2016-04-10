var app = angular.module('app', ['ui.router','lbServices','jcs-autoValidate', 'ngCookies','angularFileUpload']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
    .state('header', {
        url: '/header',
        templateUrl: 'modules/home/header.html',
        controller: 'AuthLoginController',
        authenticate: true
      })
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
      }).state('createteacher', {
          url: '/createteacher',
          templateUrl: 'modules/teacher/teacher.html',
          controller: 'TeacherCreateController'
        });
    $urlRouterProvider.otherwise('header');
  }])
  .run(['$rootScope', "$cookies",'$location','$state',
    function ($rootScope,$cookies, $location,$state) {
        // keep user logged in after page refresh
	  $rootScope.currentUser =  $cookies.get("userName");
	  
 
       $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
    	   $rootScope.currentpage = $state.current.name;
    	   if (!$rootScope.currentUser) {
    		   event.preventDefault();
    			$cookies.remove("userName");
    			  $state.go('home');
    			  $location.path('/home');
    		  }
          
        });
    }]);



