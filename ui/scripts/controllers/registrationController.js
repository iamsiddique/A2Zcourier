courierApp.controller("registrationController",['$scope','$location','intermediateService','$timeout',
 function ($scope,$location,intermediateService,$timeout) {

 	$scope.courierBoy = {};
	$scope.save = function (){
		intermediateService.saveBoys($scope.courierBoy, function(response) {
			if(response.statusCode == 1){
				$scope.regSuccess = true;
				$timeout(function(){
					$scope.regSuccess = false;
					$location.path('/list');
				},2000);
				
			}
			else if (response.statusCode == 0) {
				console.log('failed');
				$scope.regError = true;
				$timeout(function(){
					$scope.regError = false;
				},2000);
			}
		});		
	}
	
}]);
