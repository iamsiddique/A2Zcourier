courierApp.controller("myCourierController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {
$scope.myCourierList = [];

for(i=0;i<10;i++){
    var myCourier ={
    "invoiceId":"123456",
    "date":"12-01-2017"
}
$scope.myCourierList.push(myCourier);
}

        
    }
]); //http://localhost:8080/SpringRestCrud/stockentry/couriercenterid/3
