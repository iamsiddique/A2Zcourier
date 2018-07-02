courierApp.controller("headerController",['$rootScope','$scope','$location',
 function ($rootScope,$location,$scope) {
	$scope.test = function(){
		console.log('clicked')
	}
}]);
courierApp.controller("LogoutController",['$location','$rootScope','$scope','$sessionStorage',
 function ($location,$rootScope,$scope,$sessionStorage) { 	
	$rootScope.loginPage = true;			
	$scope.logout = function () {
		$sessionStorage.$reset();	
		$location.path('/login');
 		$rootScope.loginPage= false;
 		$rootScope.cBoyLogin = false;
	}
	$scope.logout();
}]);
