courierApp.controller("serviceAvlController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

        $scope.pinCode;
        $rootScope.loginPage = true;
        $scope.addArea = function() {
            $scope.streetAddress;
             $scope.loader = true;
            var pinDetails = {};

            pinDetails.pincode = $scope.pinCode;
            
            intermediateService.postServiceAvl(pinDetails, function(response) {
                if (response.statusCode == 1) {
                    $scope.regSuccess = true;
                    intermediateService.ServiceAvllist(function(response) {
                        $scope.pinCode = "";
                        $scope.streetAddress = "";
                        $scope.listOfcenter = response.data;
                         $scope.loader = false;
                    })
                    $timeout(function() {
                        $scope.regSuccess = false;
                    }, 2000);

                } else {
                    $scope.regError = true;
                     $scope.loader = false;
                    $timeout(function() {
                        $scope.regError = false;
                    }, 2000);
                }

            });
        }
        $scope.listit = function() {
             $scope.loader = true;
            intermediateService.ServiceAvllist(function(response) {
                $scope.listOfcenter = response.data;
                 $scope.loader = false;
            })
        }
        $scope.deleteC = function(data) {

            $scope.delId = data;

        }
        $scope.deletecenter = function() {
            intermediateService.centerDelete($scope.delId, function(response) {
                intermediateService.centerlist(function(response) {
                    $scope.listOfcenter = response.data;
                });
            });
        }
        


    }
]); //http://localhost:8080/SpringRestCrud/stockentry/couriercenterid/3
