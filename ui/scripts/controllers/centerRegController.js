courierApp.controller("centerRegController",['$rootScope','$scope','$location','intermediateService','$timeout',
 function ($rootScope,$scope,$location,intermediateService,$timeout) {

 	$scope.pinCode;
	$scope.addArea = function (){
		
		intermediateService.getArea($scope.pinCode, function(response) {
			if(response.ResponseCode == 0){
				var centers = response.Data;
				var myarray = [];
				var pinDetails = {};
				pinDetails.pincode = centers[0].Pincode;				
				pinDetails.city = centers[0].City;
				pinDetails.country = centers[0].Country;
				pinDetails.state = centers[0].State;
				for(i in centers){
					myarray.push(centers[i].Address);
				}
				pinDetails.address = myarray.toString();
				console.log(pinDetails);

			}
			else if (response.ResponseCode == 20) {
				console.log('failed');
				$scope.pinError = true;
				$timeout(function(){
					$scope.pinError = false;
					$scope.pinFail = response.ResponseMessage;
				},2000);
				
				
			}
		});		
	}
	
	
}]);
