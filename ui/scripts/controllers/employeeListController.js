courierApp.controller("employeeListController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

    
        $rootScope.loginPage = true;
        $scope.employeeList = [];
        intermediateService.employeelisting(function(response) {
            $scope.employeeList = response.data;
            
        })
        
        

    }
]);
