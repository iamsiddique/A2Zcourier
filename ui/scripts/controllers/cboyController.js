courierApp.controller("cboyController", ['$rootScope', '$scope', '$location', 'intermediateService', 'logCheck', '$timeout','$sessionStorage',
    function($rootScope, $scope, $location, intermediateService, logCheck, $timeout,$sessionStorage) {


        $rootScope.loginPage = false;
        $rootScope.cBoyLogin = true;

        $scope.checking = function() {
            logCheck.checkUser(function(response) {
                $location.path('/courierboy');
            });
        }
        $scope.save = function() {
            $scope.invoiceId;

            intermediateService.invDetail($scope.invoiceId, function(response) {
                $scope.details = response.data;

            })

        }
        $scope.assignMe = function() {
            data = {
                "courierBoy": {
                    "user":{
                    "id": $sessionStorage.logindetails.id
                    } 
                },
                "stockDispatch": {
                    "id": $scope.invoiceId
                }
            }
           
            intermediateService.assignMe(data, function(response) {
                if (response.statusCode == 1) {
                    $location.path('/mycouriers');
                } else if (response.statusCode == 0) {
                }

            })

        }

        $scope.camActivate = false;
        $scope.activate = function() {
            $scope.camActivate = true;
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
        
    }
]);