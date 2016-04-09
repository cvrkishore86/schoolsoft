var app = angular.module('app');

var baseUrl = 'http://localhost\\:3000';
app.run([
        'bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
              bootstrap3ElementModifier.enableValidationStateIcons(true);
       }]);

app.controller('TeacherCreateController',['$state', '$scope','Teacher', 'userPersistenceService',  function($state,$scope, userPersistenceService,Teacher){

 

    $scope.addTeacher=function(){

       Teacher
        .create({
  "teacherId": $scope.teacher.teacherId,
  "firstName": $scope.teacher.firstName,
  "lastName": $scope.teacher.lastName,
  "email" : $scope.teacher.email,
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
                      
                        $state.go('teacherlist');
                    }, 1000);
        });
  
       
    }

}])
app.controller('TeacherListController', ['$scope', 'Teacher',  'userPersistenceService' ,'$rootScope',
      function($scope, Teacher,userPersistenceService,$rootScope) {
	$rootScope.currentUser =  userPersistenceService.getCookieData();
    var schoolid=$rootScope.currentUser.schoolId;
    if ($rootScope.currentUser.admin) {
    $scope.teachers = Teacher.find();
    } else {
       $scope.teachers = Teacher.find({filter : {where: {
          schoolId: schoolid
        }}});
    }

  }]);

