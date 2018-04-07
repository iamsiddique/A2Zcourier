courierApp.controller("authenticationController",['$rootScope','$scope','$location','intermediateService','logCheck','$timeout',
 function ($rootScope,$scope,$location,intermediateService,logCheck,$timeout) {

 	
 	$rootScope.loginPage=false;
	$scope.login = function (){
		$scope.loader = true;
		// if($scope.emailid == 'courierboy'){
		// 	console.log('called');
		// 	$scope.credentials = [{username:$scope.emailid ,password:$scope.password}];
		// 		localStorage.setItem('userLoggedin', JSON.stringify($scope.credentials));
		// 		$location.path('/courierboy');
		// }
		// else if($scope.emailid == 'customer'){
		// 	$scope.credentials = [{username:$scope.emailid ,password:$scope.password}];
		// 		localStorage.setItem('userLoggedin', JSON.stringify($scope.credentials));
		// 		$location.path('/customer');
		// }
		// else{
			intermediateService.login($scope.emailid, $scope.password, function(response) {
			
			if(response.statusCode == 1){
				if(response.data.seedRole.id == 1){

					$location.path('/list')
					$rootScope.cBoyLogin = false;
				}
				else if(response.data.seedRole.id == 2){
					$location.path('/courierboy');
					$rootScope.cBoyLogin = true;
				}
				$scope.loader = false;
				$rootScope.seedRole = response.data.seedRole.id;
				$scope.credentials = [{username:$scope.emailid ,password:$scope.password}];
				localStorage.setItem('userLoggedin', JSON.stringify($scope.credentials));
				$rootScope.loginPage=true;
				console.log($rootScope.loginPage);
			}
			else if (response.statusCode == 0) {
				$scope.loader = false;
				$scope.credError = true;
				$timeout(function(){
					$scope.credError = false;
				},2000);
			}
		});
		//}

				
	}
	$scope.checking = function(){		
		logCheck.checkUser(function(response) {
			$location.path('/list');
		});		
	}	
}]);
