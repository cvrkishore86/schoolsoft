var app = angular.module('app');

app.controller('StudentCreateController',['$state', '$scope','Student', 'userPersistenceService','$rootScope',  function($state,$scope, Student,userPersistenceService,$rootScope){

	

    $scope.addStudent=function(){
    	
    	var studentobj = Object.assign({}, $scope.student, $rootScope.currentUser.schoolId);
       Student
        .create(studentobj)
        .$promise
        .then(function() {
          setTimeout(function() {
                      
                        $state.go('studentlist');
                    }, 1000);
        });
  
       
    }

}])
app.controller('StudentListController', ['$scope', 'Student',  'userPersistenceService' ,'$rootScope',
      function($scope, Student,userPersistenceService,$rootScope) {

    var schoolid=$rootScope.currentUser.schoolId;
    if ($rootScope.currentUser.admin) {
    $scope.students = Student.find();
    } else {
       $scope.students = Student.find({filter : {where: {
          schoolId: schoolid
        }}});
    }

  }]);
app.controller('StudentDashboardController', ['$scope', 'Student' ,'$rootScope',
                                         function($scope, Student,$rootScope) {
			var userId=$rootScope.currentUser.id;
                                       
                                       $scope.student = Student.findOne({filter : {where: {
                                           userId: userId
                                       }}});
                                       
                                    	 

                                     }]);

