courierApp.factory('intermediateService',['$rootScope','mainService'  ,function($rootScope,mainService) {

		var serviceObject = {};

		serviceObject.login = function(emailid, password, callback) {
		        var data = {
		                "username" : emailid,
		                "password" : password
		        };
		        console.log(data);
		        mainService.postLogin(data).success(function(response) {
		            callback(response);
		        }).error(function(response){
		            callback(response);
		        });
		    };

		return serviceObject;

}]);