var app = angular.module('app');

app.controller('StudentCreateController',['$state', '$scope','Student','School', '$rootScope',  function($state,$scope, Student,School, $rootScope){

	if ($rootScope.currentUser.admin){
		$scope.schools = School.find();
	}
	

    $scope.addStudent=function(){
    	if ($scope.student.schoolId == null) {
    		$scope.student.schoolId = $rootScope.currentUser.schoolId;
    	}
    	 console.log($scope.student.schoolId)
    	var studentobj = Object.assign({}, $scope.student);
    	console.log($scope.student);
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
app.controller('StudentListController', ['$scope', 'Student',  '$rootScope',
      function($scope, Student,$rootScope) {
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
                                       } , include : ['batch']}});
                                       
                                       $scope.labels = ['Telugu', 'Hindi', 'English', 'Maths', 'Science', 'Social'];
                                 	  $scope.series = ['Marks', 'Class Average'];

                                 	  $scope.data = [
                                 	    [65, 59, 80, 99, 56, 55],
                                 	    [28, 48, 40, 19, 86, 27]
                                 	  ]; 
                                 	  
                                 		  $scope.attendancelabels = ["Attendance", "Absence"];
                                 		  $scope.attendanceValues = [28, 2];
                                 		 $scope.markspielabels =['Telugu', 'Hindi', 'English', 'Maths', 'Science', 'Social'];
                                 		  $scope.markspiedata = [65, 59, 80, 99, 56, 55];

                                     }]);

