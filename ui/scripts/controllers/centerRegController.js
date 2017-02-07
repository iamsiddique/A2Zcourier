courierApp.controller("centerRegController",['$rootScope','$scope','$location','intermediateService','$timeout',
 function ($rootScope,$scope,$location,intermediateService,$timeout) {

 	$scope.pinCode;
 	$rootScope.loginPage=true;
	$scope.addArea = function (){
		$scope.streetAddress;
		var pinDetails = {};
		// for(i in $scope.listOfcenter){
		// 	if($scope.pinCode == $scope.listOfcenter.pincode){
		// 		console.log('yes');
		// 	}
		// }
				pinDetails.pincode = $scope.pinCode;	
				pinDetails.address = $scope.streetAddress;			
				pinDetails.city = 'Bangalore';
				pinDetails.country = 'India';
				pinDetails.state = 'Karnataka';
				console.log(pinDetails);
				intermediateService.postArea(pinDetails, function(response) {
				if(response.statusCode == 1){
					$scope.regSuccess = true;
					intermediateService.centerlist(function(response) {
						console.log(response);
						$scope.pinCode="";
						$scope.streetAddress="";
						$scope.listOfcenter = response.data;
					})
					$timeout(function(){
						$scope.regSuccess = false;
					},2000);
					
				}else{
					$scope.regError = true;
					$timeout(function(){
						$scope.regError = false;
					},2000);
				}
		
		});		
	}
	$scope.listit = function (){
		intermediateService.centerlist(function(response) {
			console.log(response);
			$scope.listOfcenter = response.data;
		})
	}
	$scope.deleteC = function(data){
		
		$scope.delId = data;
		console.log($scope.delId);
		
	}
	$scope.deletecenter = function (){
		console.log('called');
		intermediateService.centerDelete($scope.delId, function(response) {
			console.log(response);
			intermediateService.centerlist(function(response) {
			console.log(response);
			$scope.listOfcenter = response.data;
		});
	});
	}
	
	
}]);
