var app = angular.module('app');

app.controller('TeacherCreateController',['$state', '$scope','Teacher', 'School', '$rootScope', function($state,$scope, Teacher, School,$rootScope){

	$scope.teacher = {'isActive' : 'true', 'createdAt' : new Date(), 'updatedAt' : new Date(), 'schoolId' : $rootScope.currentUser.schoolId , 'createdBy' : $rootScope.currentUser.userId};
	if ($rootScope.currentUser.admin){
		$scope.schools = School.find();
	}
	

    $scope.addTeacher=function(){
    	var teacher = Object.assign({}, $scope.teacher );
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

