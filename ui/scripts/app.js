var courierApp = angular.module("a2zCouriers", ["ngRoute", "ngMessages", 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

courierApp.config(function($routeProvider) {
    $routeProvider
        .when("/login", {
            controller: 'authenticationController',
            templateUrl: "ui/templates/login.html"
        })
        .when("/registration", {
            controller: 'registrationController',
            templateUrl: "ui/templates/registrationForm.html"
        })
        .when("/list", {
            controller: 'listingController',
            templateUrl: "ui/templates/listofboys.html"
        })
        .when("/center", {
            controller: 'centerRegController',
            templateUrl: "ui/templates/centerRegistration.html"
        })

    .when('/productEntry', {
            controller: 'productEntryController',
            templateUrl: 'ui/templates/productEntry.html' //A template or templateUrl is required by AngularJS, even if your controller always redirects.

        })
        .when('/stockEntry', {
            controller: 'stockEntryController',
            templateUrl: 'ui/templates/stockEntry.html' //A template or templateUrl is required by AngularJS, even if your controller always redirects.

        })
        .when("/", {
            controller: 'authenticationController',
            templateUrl: "ui/templates/login.html"
        });
})
courierApp.run(['logCheck', '$rootScope', function(logCheck, $rootScope) {
    /*console.log('first called');
    var currentUser = logCheck.checkUser();
    console.log(logCheck.checkUser());*/
    //$rootScope.username = currentUser[0].username;
    //$rootScope.password = currentUser[0].password;
    //$scope.login();
}]);
