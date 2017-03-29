courierApp.controller("employeeListController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

    
        $rootScope.loginPage = true;
        $scope.employeeList = [];
        intermediateService.employeelisting(function(response) {
            console.log(response.data);
            $scope.employeeList = response.data;
            
        })
        
        

    }
]);
