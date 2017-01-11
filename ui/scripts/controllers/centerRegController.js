courierApp.controller("centerRegController",['$rootScope','$scope','$location','intermediateService','$timeout',
 function ($rootScope,$scope,$location,intermediateService,$timeout) {

 	$scope.pinCode;
 	$rootScope.loginPage=true;
	$scope.addArea = function (){
		$scope.streetAddress;
		var pinDetails = {};
				pinDetails.pincode = $scope.pinCode;	
				pinDetails.address = $scope.streetAddress;			
				pinDetails.city = 'Bangalore';
				pinDetails.country = 'India';
				pinDetails.state = 'Karnataka';
				console.log(pinDetails);
				intermediateService.postArea(pinDetails, function(response) {
				if(response.statusCode == 1){
					intermediateService.centerlist(function(response) {
						console.log(response);
						$scope.listOfcenter = response.data;
					})
					
				}

		/*intermediateService.getArea($scope.pinCode, function(response) {
			if(response.ResponseCode == 0){
				var centers = response.Data;
				var myarray = [];
				var pinDetails = {};
				pinDetails.pincode = centers[0].Pincode;				
				pinDetails.city = centers[0].City;
				pinDetails.country = centers[0].Country;
				pinDetails.state = centers[0].State;
				//for(i in centers){
					//myarray.push(centers[i].Address);
				//}
				//pinDetails.address = myarray.toString();
				pinDetails.address = $scope.streetAddress;
				console.log(pinDetails);
				intermediateService.postArea(pinDetails, function(response) {
				if(response.statusCode == 1){
					intermediateService.centerlist(function(response) {
						console.log(response);
						$scope.listOfcenter = response.data;
					})
					
				}
				
				console.log(response);
			});

			}
			else if (response.ResponseCode == 20) {
				console.log('failed');
				$scope.pinError = true;
				$timeout(function(){
					$scope.pinError = false;
					$scope.pinFail = response.ResponseMessage;
				},2000);
				
				
			}*/
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
