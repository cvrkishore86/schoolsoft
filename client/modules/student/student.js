var app = angular.module('app');

var baseUrl = 'http://localhost\\:3000';
app.run([
        'bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
              bootstrap3ElementModifier.enableValidationStateIcons(true);
       }]);

app.controller('StudentCreateController',['$state', '$scope','Student', 'userPersistenceService','$rootScope',  function($state,$scope, Student,userPersistenceService,$rootScope){

	

    $scope.addStudent=function(){
    	
/*    	var studentobj = Object.assign({}, $scope.student, $rootScope.currentUser.schoolId);
       Student
        .create(studentobj)*/
    	 Student
         .create({
   "studentId": $scope.student.studentId,
   "firstName": $scope.student.firstName,
   "lastName": $scope.student.lastName,
   "email" : $scope.student.email,
   "admissionNo":  $scope.student.admissionNo,
   "admissionDate": "2016-04-06",
   "rollNo": $scope.student.rollNo,
   
   "dateOfBirth": "2016-04-06",
   "gender": 1,
   "phone1": $scope.student.phone1,
	"schoolId" : $rootScope.currentUser.schoolId   
 })
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

