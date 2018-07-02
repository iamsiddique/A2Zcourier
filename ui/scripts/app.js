var courierApp = angular.module("a2zCouriers", ["ngRoute","ngStorage", "ngMessages", 'ngAnimate', 'ngSanitize',
    'ui.bootstrap', 'monospaced.qrcode',
]);
courierApp.value('THROTTLE_MILLISECONDS', 2000)
//'webcam','bcQrReader'
courierApp.config(function($routeProvider) {
    $routeProvider
        .when("/login", {
            controller: 'authenticationController',
            templateUrl: "ui/templates/login.html"
        })
        .when('/logout', {
            controller: 'LogoutController',
            template: '<h1>hi</h1>' //A template or templateUrl is required by AngularJS, even if your controller always redirects.

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
            templateUrl: 'ui/templates/productEntry.html'

        })
        .when('/stockEntry1', {
            controller: 'stockEntryController',
            templateUrl: 'ui/templates/stockEntry.html'
        })
        .when('/stockEntry', {
            controller: 'stockEntryController1',
            templateUrl: 'ui/templates/stockEntry1.html'
        })
        .when('/employeeDetails', {
            controller: 'employeeDetailsController',
            templateUrl: 'ui/templates/employeeDetails.html'
        })
        .when("/centerStock/:id", {
            controller: 'centerStockController',
            templateUrl: "ui/templates/centerStock.html"
        })
        .when("/stockDispatch", {
            controller: 'stockDispatchController',
            templateUrl: "ui/templates/stockDispatch.html"
        })
        .when("/invoice", {
            controller: 'invoiceController',
            templateUrl: "ui/templates/invoice.html"
        })
        .when("/courierboy", {
            controller: 'cboyController',
            templateUrl: "ui/templates/cboy.html"
        })
        .when("/mycouriers", {
            controller: 'myCourierController',
            templateUrl: "ui/templates/myCourier.html"
        })
        .when("/customer", {
            controller: 'customerController',
            templateUrl: "ui/templates/customer.html"
        })
        .when("/employeeList", {
            controller: 'employeeListController',
            templateUrl: "ui/templates/employeeList.html"
        })
        .when("/serviceAvailability", {
            controller: 'serviceAvlController',
            templateUrl: "ui/templates/serviceAvl.html"
        })
        .when("/listOfDispatch", {
            controller: 'listofDispatchController',
            templateUrl: "ui/templates/listOfStock.html"
        })
        .when("/Payments", {
            controller: 'payment',
            templateUrl: "ui/templates/payment.html"
        })
        .when("/", {
            controller: 'authenticationController',
            templateUrl: "ui/templates/login.html"
        });


})
courierApp.run(['logCheck', '$rootScope','$location','intermediateService','$sessionStorage', function(logCheck, $rootScope,$location,intermediateService,$sessionStorage) {
    logCheck.checkUser(function (response) {
        if(!response){
            $location.path('/');
        }
    });
    $rootScope.resetPassword = function(old,newpass,newConfPass){
        var username = $sessionStorage.logindetails.credentials[0].username;
        var data = {
            'userName':username,
            'existingPassword':old,
            'newPassword':newConfPass
        }
        intermediateService.resetPassword(data, function (response) {
            if (response.statusCode == 1) {
                $location.path('/logout');
                $.toaster({
                    priority: 'success',
                    title: 'Success',
                    message: 'Password reseted successfully',
                    settings : {
                        'timeout'      : 2500,
                    }
                });
                
        }
        else if(response.statusCode == 2){
            $.toaster({
                priority: 'danger',
                title: 'Error',
                message: 'Old password is wrong',
                settings : {
                    'timeout'      : 2500,
                }
            });
        }
        else{
            $.toaster({
                priority: 'danger',
                title: 'Error',
                message: 'Something went wrong',
                settings : {
                    'timeout'      : 2500,
                }
            });
        }
        })
    }
    $rootScope.$on('$locationChangeSuccess',function(evt, absNewUrl, absOldUrl) {
        console.log('success', evt, absNewUrl, absOldUrl);
        $rootScope.lastUrl = absOldUrl;
     });
}]);
