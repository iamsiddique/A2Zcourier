courierApp.controller("registrationController",['$rootScope','$scope','$location','intermediateService','$timeout',
 function ($rootScope,$scope,$location,intermediateService,$timeout) {

 	$scope.courierBoy = {};
	$scope.save = function (){
		var fd = new FormData();
		fd.append('dl', $scope.drivingLicense);
		fd.append('rc', $scope.rcdoc);
		fd.append('insurance', $scope.insurance);
		fd.append('rt', $scope.roadTax);
		fd.append('photo', $scope.photo);
		fd.append('user',angular.toJson($scope.courierBoy,true));
		console.log(fd);
		intermediateService.saveBoys(fd, function(response) {
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
	/*$scope.loadit = function(){
		var filename = event.target.files[0].name;
		console.log(filename);
		$scope.rddoc = event.target.files[0];
		console.log(event.target.files[0]);
	}*/
	
}]);
