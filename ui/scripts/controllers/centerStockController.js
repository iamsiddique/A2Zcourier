courierApp.controller("centerStockController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout','$filter',
    function($rootScope, $scope, $location, intermediateService, $timeout, $filter) {
        $scope.stockList = {};        
        $rootScope.loginPage = true;
        var url = $location.absUrl().split('/');
        var id = url[url.length-1]
        $scope.getStockdet = function(){
             intermediateService.centerStockData(id, function(response) {
                $scope.centerStockdetails = response.data;
            });
            intermediateService.centerStockEntryList(id, function(response) {
                $scope.cstockEntryDetails = response.data;
            });
        }
        $scope.getStockdet();
                $scope.sortColumn = 'quantity';
        $scope.reverseSort = false;
        $scope.sortData = function (column){
            $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort :false;        
            $scope.sortColumn = column;
        }
        $scope.update = function() {
                $scope.submitted = false;
                console.log($scope.stockList);
                
                $scope.stockList.entryDate = $filter('date')($scope.stockList.entryDate, "yyyy-MM-dd");
                $scope.stockList.expiryDate = $filter('date')($scope.stockList.expiryDate, "yyyy-MM-dd");
                $scope.stockList.manufactureDate = $filter('date')($scope.stockList.manufactureDate, "yyyy-MM-dd");
                
                intermediateService.stockEntryEdit($scope.stockList, function(response) {
                    if (response.statusCode == 1) {
                        $scope.regSuccess = true;
                        $scope.getStockdet();
                        $timeout(function() {
                            $scope.regSuccess = false;
                        }, 2000);

                    } else if (response.statusCode == 0) {
                        console.log('failed');
                        $scope.regError = true;
                        $timeout(function() {
                            $scope.regError = false;
                        }, 2000);
                    }
                });
           


        }

        $scope.arrowStyle = function (column){
            if ($scope.sortColumn == column){
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
            }

            return '';
        }
        $scope.sendData = function(data){
            $scope.stockList = angular.copy(data);
            $scope.productImageSrc = $rootScope.urlBase + "product/download/photo/" + $scope.stockList.product.id;
        }
        $scope.today = function() {
            $scope.stockList.manufactureDate = new Date();
            $scope.stockList.expiryDate = new Date();
            $scope.stockList.entryDate = new Date();

        };
        $scope.today();

        $scope.clear = function() {
            $scope.stockList.manufactureDate = null;
            $scope.stockList.expiryDate = null;
            $scope.stockList.entryDate = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            // dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2200, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        $scope.open3 = function() {
            $scope.popup3.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.stockList.manufactureDate = new Date(year, month, day);
            $scope.stockList.expiryDate = new Date(year, month, day);
            $scope.stockList.entryDate = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };
         $scope.popup3 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
        $scope.disabled = function (date, mode) {
            return false;
        };
    }
]); 
