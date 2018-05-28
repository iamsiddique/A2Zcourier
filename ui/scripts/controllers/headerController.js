courierApp.controller("headerController",['$rootScope','$scope','$location',
 function ($rootScope,$location,$scope) {
 	$scope.menuItems = [
    {'name':'list','title':'List of Courier Boys'},
    {'name':'center','title':'List of Center'},
    {'name':'productEntry','title':'Product Entry'},
    {'name':'stockEntry','title':'Stock Entry'},
    {'name':'stockDispatch','title':'Stock Dispatch'},
    {'name':'serviceAvailability','title':'Service Availability'}
     ];
	$scope.addActive = function(clicked){
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
