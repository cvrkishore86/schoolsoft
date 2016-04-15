var app = angular.module('app');

app.controller('BatchCreateController',['$state', '$scope','Batch',  '$rootScope', function($state,$scope, Batch, $rootScope){

	if ($rootScope.currentUser.admin){
		$scope.schools = School.find();
	}
	

    $scope.addBatch=function(){
    	var batch = Object.assign({}, $scope.batch );
       Batch
        .create(batch)
        .$promise
        .then(function() {
          setTimeout(function() {
                      
                    }, 1000);
        });
  
       
    }

}])