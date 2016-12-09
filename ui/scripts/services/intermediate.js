courierApp.factory('intermediateService',['$rootScope','mainService'  ,function($rootScope,mainService) {

		var serviceObject = {};

		serviceObject.login = function(emailid, password, callback) {
		        var data = {
		                "username" : emailid,
		                "password" : password
		        };
		       
		        mainService.postLogin(data).success(function(response) {
		        	callback(response);
		        }).error(function(response){
		            callback(response);
		        });
		    };

		serviceObject.saveBoys = function(courierboyData, callback) {
		        var data = courierboyData;
		       
		        mainService.postBoys(data).success(function(response) {		        	
		            callback(response);
		        }).error(function(response){
		            callback(response);
		        });
		    };
		serviceObject.listBoys = function(callback) {
		        
		        mainService.getBoys().success(function(response) {	
		        console.log(response);	        	
		            callback(response);
		        }).error(function(response){
		            callback(response);
		        });
		    };
		serviceObject.deleteBoys = function(id,callback) {
		        data = id;
		        mainService.deleteBoys(data).success(function(response) {	
		        console.log(response);	        	
		            callback(response);
		        }).error(function(response){
		            callback(response);
		        });
		    };


		return serviceObject;

}]);