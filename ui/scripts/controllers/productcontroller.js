courierApp.controller("productEntryController",['$rootScope','$scope','$location','intermediateService','$timeout',
 function ($rootScope,$scope,$location,intermediateService,$timeout) {

 	$scope.product = {};
 	$rootScope.loginPage=true;
	$scope.save = function (){
		console.log('save called');
	if($scope.productform.$valid){
		$scope.submitted = false;
		
		intermediateService.saveProduct($scope.product, function(response) {
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
 	else{
 		console.log('invalid called');
 		$scope.submitted = true; 
 	}
		
			
	}
		
}]);
