courierApp.controller("centerRegController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

        $scope.pinCode;
        $rootScope.loginPage = true;
        $scope.addArea = function() {
            $scope.loader = true;
            $scope.streetAddress;
            var pinDetails = {};

            pinDetails.pincode = $scope.pinCode;
            pinDetails.address = $scope.streetAddress;
            pinDetails.email = $scope.email;
            pinDetails.city = 'Bangalore';
            pinDetails.country = 'India';
            pinDetails.state = 'Karnataka';
            intermediateService.postArea(pinDetails, function(response) {
                if (response.statusCode == 1) {
                    $scope.regSuccess = true;

                    intermediateService.centerlist(function(response) {
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
            intermediateService.centerlist(function(response) {
                $scope.listOfcenter = response.data;
                $scope.loader = false;
            })
        }
        $scope.deleteC = function(data) {

            $scope.delId = data;

        }
        $scope.deletecenter = function() {
            $scope.loader = true;
            intermediateService.centerDelete($scope.delId, function(response) {
                intermediateService.centerlist(function(response) {
                    $scope.listOfcenter = response.data;
                    $scope.loader = false;
                });
            });
        }
        $scope.centerStock = function(cid) {
            $location.path('/centerStock/'+cid);
            // intermediateService.centerStockData(cid, function(response) {
            //     $location.path('/centerStock/cid');
            // });
            // intermediateService.centerStockEntryList(cid, function(response) {
            //     //$location.path('/centerStock');
            // });
        }
        $scope.centerModify = function(data) {
            $scope.centerEdit = {};
            $scope.centerEdit = angular.copy(data);

        }
        $scope.centerEditSave = function(data) {
            intermediateService.postCenterEdit(data, function(response) {
                if (response.statusCode == 1) {
                    $scope.regSuccess = true;
                    intermediateService.centerlist(function(response) {
                        $scope.pinCode = "";
                        $scope.streetAddress = "";
                        $scope.email = "";
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


    }
]); //http://localhost:8080/SpringRestCrud/stockentry/couriercenterid/3