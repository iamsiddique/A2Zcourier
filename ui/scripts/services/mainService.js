courierApp.config(function($httpProvider) {

	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.factory('mainService',['$http','$rootScope',function($http, $rootScope) {

		$rootScope.urlBase = '';
		$rootScope.header = { headers : { "Content-type" : "application/json","Accept" : "application/json" } };

		var dataFetch = {};

		dataFetch.postLogin = function(data) {

		    //return $http.post('http://localhost:8080/SpringRestCrud/admin/login', data, $rootScope.header);
		    if(data.username == 'admin' && data.password == 'admin'){
		    	return $http.get('ui/json/cred.json');
		    }
		    else{
		    	return $http.get('ui/json/ncred.json');
		    }
		    
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