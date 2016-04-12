var app = angular.module('app');

app.controller('TeacherCreateController',['$state', '$scope','Teacher', '$rootScope', function($state,$scope, Teacher,$rootScope){

 

    $scope.addTeacher=function(){
    	var teacher = Object.assign({'isActive' : 'true', 'createdAt' : new Date(), 'updatedAt' : new Date(), 'schoolId' : 1 , 'userId' : 2}, $scope.teacher, $rootScope.currentUser.schoolId);
       Teacher
        .create(teacher)
        .$promise
        .then(function() {
          setTimeout(function() {
                      
                        $state.go('teacherlist');
                    }, 1000);
        });
  
       
    }

}])
app.controller('TeacherListController', ['$scope', 'Teacher',  '$rootScope',
      function($scope, Teacher,$rootScope) {
	var schoolid=$rootScope.currentUser.schoolId;
    if ($rootScope.currentUser.admin) {
    $scope.teachers = Teacher.find();
    } else {
       $scope.teachers = Teacher.find({filter : {where: {
          schoolId: schoolid
        }}});
    }

  }]);

