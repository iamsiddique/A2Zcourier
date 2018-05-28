courierApp.controller("listofDispatchController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout','$filter',
    function($rootScope, $scope, $location, intermediateService, $timeout,$filter) {

      $rootScope.loginPage = true;
       intermediateService.liststockDispatch(function(response) {
            $scope.stockDispatchList= response.data;
           
        });
    }
]);