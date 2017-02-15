courierApp.controller("centerStockController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

       
        $scope.getStockdet = function(){
        	$scope.centerStockdetails = intermediateService.cstockDetails;
        }
        $scope.getStockdet();
                $scope.sortColumn = 'quantity';
        $scope.reverseSort = false;
        $scope.sortData = function (column){
            $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort :false;        
            $scope.sortColumn = column;
        }

        $scope.arrowStyle = function (column){
            if ($scope.sortColumn == column){
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
            }

            return '';
        }
    }
]); 
