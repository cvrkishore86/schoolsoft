var app = angular.module('app');

var baseUrl = 'http://localhost\\:3000';
app.run([
        'bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
              bootstrap3ElementModifier.enableValidationStateIcons(true);
       }]);

app.controller('StudentCreateController',['$state', '$scope','Student', function($state,$scope, Student){

 

    $scope.addStudent=function(){

       Student
        .create({
  "studentId": $scope.student.studentId,
  "firstName": $scope.student.firstName,
  "lastName": $scope.student.lastName,
  "email" : $scope.student.email,
  "admissionNo": "123456",
  "admissionDate": "2016-04-06",
  "rollNo": "123456",
  
  "dateOfBirth": "2016-04-06",
  "gender": 1,
  "phone1": "964222222"
  
})
        .$promise
        .then(function() {
          setTimeout(function() {
                      
                        $state.go('studentlist');
                    }, 1000);
        });
  
       
    }

}])
app.controller('StudentListController', ['$scope', 'Student', '$rootScope',
      function($scope, Student, $rootScope) {
    var schoolid=$rootScope.currentUser.schoolId;
    if ($rootScope.currentUser.admin) {
    $scope.students = Student.find();
    } else {
       $scope.students = Student.find({filter : {where: {
          schoolId: schoolid
        }}});
    }

  }]);

