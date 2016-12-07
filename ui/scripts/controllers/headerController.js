courierApp.controller("headerController",['$rootScope','$scope','$location',
 function ($rootScope,$location,$scope) {
 	
	$rootScope.loginPage;	
	console.log($rootScope.loginPage);
	$rootScope.logout = function(){		
		localStorage.removeItem('userLoggedin');
		$location.path('/login');
 		$rootScope.loginPage=false;

	}
}]);
