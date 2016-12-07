courierApp.controller("authenticationController",['$rootScope','$scope','$location','intermediateService','logCheck','$timeout',
 function ($rootScope,$scope,$location,intermediateService,logCheck,$timeout) {

 	
 	$rootScope.loginPage=false;
	$scope.login = function (){

		intermediateService.login($scope.emailid, $scope.password, function(response) {
			if(response.statusCode == 1){
				$location.path('/list')
				$scope.credentials = [{username:$scope.emailid ,password:$scope.password}];
				localStorage.setItem('userLoggedin', JSON.stringify($scope.credentials));
				$rootScope.loginPage=true;
				console.log($rootScope.loginPage);
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
			$location.path('/list');
		});		
	}		
}]);
