courierApp.controller("authenticationController",['$scope','$location','intermediateService','logCheck','$timeout',
 function ($scope,$location,intermediateService,logCheck,$timeout) {

 	$rootScope.loginPage;
	$scope.login = function (){


		intermediateService.login($scope.emailid, $scope.password, function(response) {
			if(response.statusCode == 1){
				$location.path('/list')
				$scope.credentials = [{username:$scope.emailid ,password:$scope.password}];
				localStorage.setItem('userLoggedin', JSON.stringify($scope.credentials));
			}
			else if (response.statusCode == 0) {
				$scope.credError = true;
				$timeout(function(){
					$scope.credError = false;
				},2000);
			}
		});		
	}
	$scope.checking = function(){
		
		logCheck.checkUser(function(response) {
			console.log(response);
			$location.path('/list');
		});
		
	}
	$scope.logout = function(){
		
		localStorage.removeItem('userLoggedin');
		$location.path('/login');
	}
	
}]);
