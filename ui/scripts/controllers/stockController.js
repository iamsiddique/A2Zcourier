courierApp.controller("stockEntryController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$filter',
    function($rootScope, $scope, $location, intermediateService, $timeout, $filter) {

        $scope.stock = {};
        $scope.stock.warehouse = undefined;
        $scope.stock.productname = undefined;
        $rootScope.loginPage = true;
        $scope.countries = [];
        $scope.products = [];
        intermediateService.centerlist(function(response) {
            for (i in response.data)
                if (response.data[i].pincode != null) {
                    var pincode = {}
                    pincode.name = response.data[i].pincode;
                    pincode.id = response.data[i].id;
                    $scope.countries.push(pincode);
                }
        })
        intermediateService.productlist(function(response) {
            for (i in response.data)
                if (response.data[i].name != null) {
                    var productlist = {}
                    productlist.name = response.data[i].name;
                    productlist.id = response.data[i].id;
                    $scope.products.push(productlist);
                }
        })
        $scope.save = function() {
            if ($scope.stockform.$valid) {
                $scope.submitted = false;
                var data = {};
                data.product = {}
                data.courierCenter = {};
                data.entryDate = $filter('date')($scope.stock.enterDate, "yyyy-MM-dd");
                data.expiryDate = $filter('date')($scope.stock.expDate, "yyyy-MM-dd");
                data.manufactureDate = $filter('date')($scope.stock.manuDate, "yyyy-MM-dd");
                data.quantity = $scope.stock.quantity;
                data.product.id = $scope.stock.product.id;
                data.courierCenter.id = $scope.stock.courierCenter.id;
                data.invoiceNumber = $scope.stock.invoiceNumber;
                data.shopName = $scope.stock.shopName;

                intermediateService.stockEntry(data, function(response) {
                    if (response.statusCode == 1) {
                        $scope.regSuccess = true;
                        $timeout(function() {
                            $scope.regSuccess = false;
                            //$location.path('/list');
                        }, 2000);

                    } else if (response.statusCode == 0) {
                        $scope.regError = true;
                        $timeout(function() {
                            $scope.regError = false;
                        }, 2000);
                    }
                });
            } else {
                $scope.submitted = true;
            }


        }
        $scope.today = function() {
            $scope.stock.manuDate = new Date();
            $scope.stock.expDate = new Date();
            $scope.stock.enterDate = new Date();

        };
        $scope.today();

        $scope.clear = function() {
            $scope.stock.manuDate = null;
            $scope.stock.expDate = null;
             $scope.stock.enterDate = null;
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
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.stock.manuDate = new Date(year, month, day);
            $scope.stock.expDate = new Date(year, month, day);
             $scope.stock.enterDate = new Date(year, month, day);
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


    }
]);
