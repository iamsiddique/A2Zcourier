courierApp.controller("serviceAvlController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

        $scope.pinCode;
        $rootScope.loginPage = true;
        $scope.addArea = function() {
            $scope.streetAddress;
            var pinDetails = {};

            pinDetails.pincode = $scope.pinCode;
            
            console.log(pinDetails);
            intermediateService.postServiceAvl(pinDetails, function(response) {
                if (response.statusCode == 1) {
                    $scope.regSuccess = true;
                    intermediateService.ServiceAvllist(function(response) {
                        console.log(response);
                        $scope.pinCode = "";
                        $scope.streetAddress = "";
                        $scope.listOfcenter = response.data;
                    })
                    $timeout(function() {
                        $scope.regSuccess = false;
                    }, 2000);

                } else {
                    $scope.regError = true;
                    $timeout(function() {
                        $scope.regError = false;
                    }, 2000);
                }

            });
        }
        $scope.listit = function() {
            intermediateService.ServiceAvllist(function(response) {
                $scope.listOfcenter = response.data;
            })
        }
        $scope.deleteC = function(data) {

            $scope.delId = data;
            console.log($scope.delId);

        }
        $scope.deletecenter = function() {
            console.log('called');
            intermediateService.centerDelete($scope.delId, function(response) {
                console.log(response);
                intermediateService.centerlist(function(response) {
                    console.log(response);
                    $scope.listOfcenter = response.data;
                });
            });
        }
        


    }
]); //http://localhost:8080/SpringRestCrud/stockentry/couriercenterid/3
