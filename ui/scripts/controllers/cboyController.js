courierApp.controller("cboyController",['$rootScope','$scope','$location','intermediateService','logCheck','$timeout',
 function ($rootScope,$scope,$location,intermediateService,logCheck,$timeout) {

 	
 	$rootScope.loginPage=false;
 	//alert('hi');
	$scope.checking = function(){		
		logCheck.checkUser(function(response) {
			$location.path('/courierboy');
		});		
	}	
	$scope.camActivate = false;
	$scope.activate = function(){
		$scope.camActivate = true;
	}
	$scope.onSuccess = function(data) {
        console.log(data);
    };
    $scope.onError = function(error) {
        console.log(error);
    };
    $scope.onVideoError = function(error) {
        console.log(error);
    };
 
}]);
