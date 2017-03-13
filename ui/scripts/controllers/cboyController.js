courierApp.controller("cboyController",['$rootScope','$scope','$location','intermediateService','logCheck','$timeout',
 function ($rootScope,$scope,$location,intermediateService,logCheck,$timeout) {

 	
 	$rootScope.loginPage=false;

	$scope.checking = function(){		
		logCheck.checkUser(function(response) {
			$location.path('/courierboy');
		});		
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
  $scope.start = function() {
      $scope.cameraRequested = true;
  }
  
  $scope.processURLfromQR = function (url) {
    $scope.url = url;
    $scope.cameraRequested = false;
  }
}]);
