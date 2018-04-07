courierApp.config(function($httpProvider) {

	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.factory('mainService',['$http','$rootScope',function($http, $rootScope) {

		//$rootScope.urlBase = 'http://166.62.40.162:8080/a2z/';
		$rootScope.urlBase = 'http://localhost:8080/SpringRestCrud/';
		$rootScope.header = {header: { "Content-type" : "application/json","Accept" : "application/json" }};
		$rootScope.uploadheader = { headers : { 'Content-Type' : undefined } };

		var dataFetch = {};

		dataFetch.postLogin = function(data) {

		    return $http.post($rootScope.urlBase+'user/login', data, $rootScope.header);		    
		    
		};
		dataFetch.postBoys = function(data) {
			console.log('called boys');
		    return $http.post($rootScope.urlBase+ 'courierboy/save', data, $rootScope.uploadheader);		    
		    
		};
		dataFetch.postUpdate = function(data) {
			console.log('called update');
		    return $http.post($rootScope.urlBase+ 'courierboy/update', data, $rootScope.uploadheader);		    
		    
		};
		dataFetch.getBoys = function() {
			console.log('called get boys');
		    return $http.get($rootScope.urlBase +'courierboy/list', $rootScope.header);		    
		    
		};
		dataFetch.deleteBoys = function(id) {

		    return $http.get($rootScope.urlBase +'courierboy/deactivate/'+ id, $rootScope.header);		    
		    
		};
		dataFetch.getArea = function(pin) {

		    return $http.get('https://www.whizapi.com/api/v2/util/ui/in/indian-city-by-postal-code?project-app-key=84icfal4d8ad42v8o8jdw8fe&pin='+ pin, $rootScope.header);		    
		    
		};
		dataFetch.postCenter = function(data) {

		    return $http.post($rootScope.urlBase + 'couriercenter/save',data, $rootScope.header);		    
		    
		};
		dataFetch.postCenterEdit = function(data) {

		    return $http.post($rootScope.urlBase + 'couriercenter/update',data, $rootScope.header);		    
		    
		};
		dataFetch.getCenterlist = function() {

		    return $http.get($rootScope.urlBase + 'couriercenter/list', $rootScope.header);		    
		    
		};
		dataFetch.deleteCenter= function(id) {

		    return $http.get($rootScope.urlBase + 'couriercenter/delete/' + id, $rootScope.header);		    
		    
		};
		dataFetch.postServiceAvl = function(data) {

		    return $http.post($rootScope.urlBase + 'serviceavailability/save',data, $rootScope.header);		    
		    
		};
		dataFetch.getServiceAvllist = function() {

		    return $http.get($rootScope.urlBase + 'serviceavailability/list', $rootScope.header);		    
		    
		};
		dataFetch.saveProduct= function(data) {

		    return $http.post($rootScope.urlBase + 'product/save',data, $rootScope.uploadheader);		    
		    
		};
		dataFetch.saveEditProduct= function(data) {

		    return $http.post($rootScope.urlBase + 'product/update',data, $rootScope.uploadheader);		    
		    
		};
		dataFetch.getProduct= function() {

		    return $http.get($rootScope.urlBase + 'product/list', $rootScope.header);		    
		    
		};
		dataFetch.stockEntry= function(data) {

		    return $http.post($rootScope.urlBase + 'stockentry/save',data, $rootScope.header);		    
		    
		};
		dataFetch.centerStockData= function(id) {

		    return $http.get($rootScope.urlBase + 'stockentry/couriercenterid/'+ id, $rootScope.header);		    
		    
		};
		dataFetch.employeeAdd= function(data) {

		    return $http.post($rootScope.urlBase + 'employee/save',data, $rootScope.uploadheader);		    
		    
		};
		dataFetch.employeelisting= function() {

		    return $http.get($rootScope.urlBase + 'employee/list', $rootScope.uploadheader);		    
		    
		};
		dataFetch.stockDispatch= function(data) {

		    return $http.post($rootScope.urlBase + 'stockdispatch/save',data, $rootScope.header);		    
		    
		};
		dataFetch.liststockDispatch= function() {

		    return $http.get($rootScope.urlBase + 'stockdispatch/list', $rootScope.header);		    
		    
		};
		dataFetch.invDetail= function(data) {

		    return $http.get($rootScope.urlBase + 'stockdispatch/id/'+data, $rootScope.header);		    
		    
		};
		return dataFetch;
		
}])
.factory('logCheck',['$http','$rootScope',function($http, $rootScope) {

		
		var credentialFetch = {};

		credentialFetch.checkUser = function(callback) {
			
			if (localStorage.getItem('userLoggedin') !== null) {
    	var currentUser = JSON.parse(localStorage.getItem('userLoggedin'));
    	console.log(currentUser[0].password);
    	callback(currentUser);
    	} 
		    
		};
		return credentialFetch;
}]);