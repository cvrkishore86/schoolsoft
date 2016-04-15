var app = angular.module('app');

app.controller('StudentCreateController',['$state', '$scope','Student','School', 'Parent','$rootScope','$stateParams',  function($state,$scope, Student,School,Parent, $rootScope,$stateParams ){
	$scope.parents = new Array(0);
	if ($rootScope.currentUser.admin){
		$scope.schools = School.find();
	}
	

		$scope.setParents = function() {
		var parentObj = {studentId : $stateParams.studentId,  createdAt : new Date(), updatedAt : new Date() };
		var parentObj2 = Object.assign({}, parentObj);
		var parentObj3 = Object.assign({}, parentObj);
		
								switch ($scope.noofparents) {
								case '1':
									$scope.parents = [parentObj];
									break;
								case '2':
									$scope.parents = [parentObj, parentObj2];
									break;
								case '3':
									$scope.parents = [parentObj, parentObj2, parentObj3];
									break;
								default:
									$scope.parents = [];
									break;
								}
			}

		 $scope.addParents = function() {
		    	Parent.createMany($scope.parents);
		    }
		
		
    $scope.addStudent=function(){
    	if ($scope.student.schoolId == null) {
    		$scope.student.schoolId = $rootScope.currentUser.schoolId;
    	}
    	$scope.student.createdBy = $rootScope.currentUser.userId;
    	
    	var studentobj = Object.assign({}, $scope.student);
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
app.controller('StudentDashboardController', ['$scope', 'Student' ,'$rootScope','$stateParams',
                                         function($scope, Student,$rootScope, $stateParams) {
			var userId=$rootScope.currentUser.id;
                                       
                                       $scope.student = Student.findOne({filter : {where: {
                                           studentId: $stateParams.studentId
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

