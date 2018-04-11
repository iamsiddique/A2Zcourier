courierApp.controller("myCourierController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$sessionStorage',
    function($rootScope, $scope, $location, intermediateService, $timeout, $sessionStorage) {
        $scope.myCourierList = [];
        $scope.myDeliveredCourierList = [];
        $rootScope.cBoyLogin = true;

        // for (i = 0; i < 15; i++) {
        //     var myCourier = {
        //         "invoiceId": "12345"+i,
        //         "date": "12-01-2017",
        //         "address": "No 3, shaik street, bharati nagar, Bangalore",
        //         "paymentMode": "Cash"
        //     }
        //     $scope.myCourierList.push(myCourier);
        // }
        $scope.getList = function() {           
            var id = $sessionStorage.logindetails.id;
            intermediateService.assignedList(id, function(response) {
                if (response.statusCode == 1) {
                    console.log(response.data.stockDispatch);
                    for (i in response.data) {
                        $scope.myCourierList.push(response.data[i]);
                        //$scope.myCourierList[i].assignedDate = response.data[i].assignedDate;
                    }
                    //$location.path('/mycouriers');
                } else if (response.statusCode == 0) {
                    console.log(response.data);
                    //$location.path('/mycouriers');
                }

            })
        }
        $scope.markasDelivered = function(data) {
            var sendData = {
                "id": data.id,
                "courierStatus": "D"
            }
            //var id = data.id;
            intermediateService.markAsDelivered(sendData, function(response) {
                if (response.statusCode == 1) {
                    console.log(response.data);
                    
                } else if (response.statusCode == 0) {
                    console.log(response.data);
                    //$location.path('/mycouriers');
                }

            })
        }
         $scope.getDeliveredList = function() {           
            var id = $sessionStorage.logindetails.id;
            intermediateService.deliveredList(id, function(response) {
                if (response.statusCode == 1) {
                    
                    for (i in response.data) {
                        $scope.myDeliveredCourierList.push(response.data[i]);
                        //$scope.myCourierList[i].assignedDate = response.data[i].assignedDate;
                    }
                    //$location.path('/mycouriers');
                } else if (response.statusCode == 0) {
                    console.log(response.data);
                    //$location.path('/mycouriers');
                }

            })
        }
        $scope.getList();
        $scope.getDeliveredList();
        $scope.printAssigned = function(id) {
            var printContents = document.getElementById(id).innerHTML;
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }


    }
]); //http://localhost:8080/SpringRestCrud/stockentry/couriercenterid/3