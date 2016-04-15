var app = angular.module('app');

app.controller('TimetableCreateController',['$state', '$scope','Timetable','School','$rootScope','$stateParams',  function($state,$scope, Timetable,School,$rootScope,$stateParams ){

	$scope.noofperiods = 1;
	
	
	
$scope.setPeriods = function() {	
	
	var  startTime = 9;
	var endTime = 10;
	$scope.periods = new Array();
	//assume that day starts at 9 am and till 5pm and calculate x periods per 
	for (i=0; i < $scope.noofperiods; i++) {
		$scope.periods[i] = {startTime: startTime + i +":00", endTime : endTime+i+":00"};
	}	
var timeTableObj = {batchId : $stateParams.studentId,  schoolId : 1};
var timetablesmatrix = new Array();
for (i=0;i<6; i++){
	timetablesmatrix[i] = new Array();
	for (j=0;j<$scope.noofperiods;j++){
		timetablesmatrix[i][j] = Object.assign({}, timeTableObj);
	}
}
$scope.timetables = timetablesmatrix;
}

$scope.setPeriods();
}]);