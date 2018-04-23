courierApp.controller("authenticationController",['$rootScope','$scope','$location','intermediateService','logCheck','$timeout','$sessionStorage',
 function ($rootScope,$scope,$location,intermediateService,logCheck,$timeout,$sessionStorage) {

 	$scope.loader = false;
 	$rootScope.loginPage=false;
	$scope.login = function (){
		$scope.loader = true;
			intermediateService.login($scope.emailid, $scope.password, function(response) {			
			if(response.statusCode == 1){
				if(response.data.seedRole.id == 1){
					$location.path('/list')
					$rootScope.cBoyLogin = false;
					$scope.loader = false;
				}
				else if(response.data.seedRole.id == 2){
					$location.path('/courierboy');
					$rootScope.cBoyLogin = true;
					$scope.loader = false;
				}	
				$sessionStorage.logindetails ={};	
				$sessionStorage.logindetails.id = response.data.id;
				$rootScope.seedRole = response.data.seedRole.id;
				$scope.credentials = [{username:$scope.emailid ,password:$scope.password}];
				$sessionStorage.logindetails.credentials = $scope.credentials;
				$rootScope.loginPage=true;
			}
			else if (response.statusCode == 0) {
				$scope.loader = false;
				$scope.credError = true;
				$timeout(function(){
					$scope.credError = false;
				},2000);
			}
		});	
	}
	
}]);
