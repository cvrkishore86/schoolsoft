var app = angular.module('app', ['ui.router','lbServices','jcs-autoValidate', 'ngCookies','angularFileUpload','chart.js']);
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
    
            templateUrl: 'modules/student/createstudent.html',
        controller: 'StudentCreateController',
        authenticate: true
      }).state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      }).state('staticdashboard', {
          url: '/staticdashboard',
          templateUrl: 'modules/student/dashboard.html',
          controller: 'StudentDashboardController',
          authenticate: true
        })
        .state('dashboard', {
          url: '/dashboard/:studentId',
          templateUrl: 'modules/student/dashboard.html',
          controller: 'StudentDashboardController',
          authenticate: true
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
        })
        .state('teacherlist', {
            url: '/teacherlist',
            templateUrl: 'modules/teacher/teachers.html',
            controller: 'TeacherListController'
          }).state('createparents', {
              url: '/createparents/:studentId',
              templateUrl: 'modules/parent/createparents.html',
              controller: 'StudentCreateController'
            }).state('parentlist', {
                url: '/parentlist',
                templateUrl: 'modules/student/teachers.html',
                controller: 'TeacherListController'
              }).state('createbatch', {
                url: '/createbatch',
                templateUrl: 'modules/batch/createbatch.html',
                controller: 'BatchCreateController'
              }).state('batchlist', {
                  url: '/batchlist',
                  templateUrl: 'modules/teacher/teachers.html',
                  controller: 'TeacherListController'
                }).state('createtimetable', {
                    url: '/createtimetable',
                    templateUrl: 'modules/timetable/createtimetable.html',
                    controller: 'TimetableCreateController'
                  });
    $urlRouterProvider.otherwise('header');
  }])
  .run(['$rootScope', "$cookies",'$location','$state',
    function ($rootScope,$cookies, $location,$state) {
        // keep user logged in after page refresh
	  $rootScope.currentUser =  angular.fromJson($cookies.get("userName"));
	  
	  $rootScope.cssfile = 'sb-admin-2.css';
	  
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



