courierApp.controller("customerController",['$rootScope','$scope','$location','intermediateService','logCheck','$timeout',
 function ($rootScope,$scope,$location,intermediateService,logCheck,$timeout) {

 	
 	$rootScope.loginPage=false;
 	
	$scope.checking = function(){		
		logCheck.checkUser(function(response) {
			$location.path('/customer');
		});		
	}	
	
}]);
