courierApp.controller("headerController",['$rootScope','$scope','$location',
 function ($rootScope,$location,$scope) {
 	
	//$rootScope.loginPage = true;	
	//console.log($rootScope.loginPage);
	$scope.logout = function(){		
		localStorage.removeItem('userLoggedin');
		$location.path('/login');
 		$rootScope.loginPage= false;

	}
}]);
courierApp.controller("LogoutController",['$location','$rootScope','$scope',
 function ($location,$rootScope,$scope) {
 	
	$rootScope.loginPage = true;	
	//console.log($rootScope.loginPage);
	
	$scope.logout = function () {		
		localStorage.removeItem('userLoggedin');
		$location.path('/login');
 		$rootScope.loginPage= false;
	}
	$scope.logout();
}]);
