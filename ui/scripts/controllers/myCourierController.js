courierApp.controller("myCourierController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$sessionStorage',
    function($rootScope, $scope, $location, intermediateService, $timeout, $sessionStorage) {
        
        
        $rootScope.cBoyLogin = true;
        $scope.retrivalAssignederr = true;
        $scope.retrivalDeliverederr = true;
        $scope.retrivalPaiderr = true;
        $scope.getList = function() {  
        $scope.myCourierList = [];         
            var id = $sessionStorage.logindetails.id;

            intermediateService.assignedList(id, function(response) {
                if (response.statusCode == 1) {
                    for (i in response.data) {
                        $scope.myCourierList.push(response.data[i]);
                    }                   
                    $scope.retrivalAssignederr = false; 
                } else if (response.statusCode == 0) {
                    $scope.retrivalAssignederr = true;
                }

            })
        }

        $scope.markasDelivered = function(data) {
            var sendData = {
                "id": data.id,
                "courierStatus": "D"
            }
            intermediateService.markAsDelivered(sendData, function(response) {
                if (response.statusCode == 1) {
                    $scope.getList();
                    
                } else if (response.statusCode == 0) {
                    //$location.path('/mycouriers');
                }

            })
        }

         $scope.getDeliveredList = function() {   
            $scope.myDeliveredCourierList = [];        
            var id = $sessionStorage.logindetails.id;
            intermediateService.deliveredList(id, function(response) {
                if (response.statusCode == 1) {                    
                    for (i in response.data) {
                        $scope.myDeliveredCourierList.push(response.data[i]);
                    }
                    $scope.retrivalDeliverederr = false;
                } else if (response.statusCode == 0) {
                    $scope.retrivalDeliverederr = true;
                }

            })
        }
        $scope.getPaidList = function() {    
            $scope.myPaidList = [];       
            var id = $sessionStorage.logindetails.id;
            intermediateService.paidList(id, function(response) {
                if (response.statusCode == 1) {                    
                    for (i in response.data) {
                        $scope.myPaidList.push(response.data[i]);
                    }
                    $scope.retrivalPaiderr = false;
                } else if (response.statusCode == 0) {
                    $scope.retrivalPaiderr = true;
                }

            })
        }
        $scope.getList();
        $scope.getDeliveredList();
        $scope.getPaidList();
        $scope.printAssigned = function(id) {
            var printContents = document.getElementById(id).innerHTML;
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }


    }
]); //http://localhost:8080/SpringRestCrud/stockentry/couriercenterid/3