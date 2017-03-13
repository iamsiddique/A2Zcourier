courierApp.controller("stockDispatchController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout','$filter',
    function($rootScope, $scope, $location, intermediateService, $timeout,$filter) {

        var counter = 0;
        $rootScope.loginPage = true;
        $scope.datalist = [{
            product: 'new' + counter
        }]
        $scope.addnew = function() {
            counter++;
            $scope.datalist.push({
                product: 'new' + counter
            });
        }
        $scope.delete = function(product) {
            console.log(product.product);
            console.log($scope.datalist);

        }
        $scope.save = function() {
            $rootScope.invoiceData ={}
            $rootScope.invoiceData.invDate = $filter('date')($scope.enterDate, "yyyy-MM-dd");
            $rootScope.invoiceData.address = $scope.address;
            $rootScope.invoiceData.products = $scope.datalist;
            console.log($rootScope.invoiceData);
            $location.path('/invoice');

        }
        $scope.today = function() {

            $scope.enterDate = new Date();

        };
        $scope.today();

        $scope.clear = function() {

            $scope.enterDate = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            // dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
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


        $scope.open3 = function() {
            $scope.popup3.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.stock.manuDate = new Date(year, month, day);
            $scope.stock.expDate = new Date(year, month, day);
            $scope.enterDate = new Date(year, month, day);
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
courierApp.controller("invoiceController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout','$filter',
    function($rootScope, $scope, $location, intermediateService, $timeout,$filter) {

       $scope.invdata = $rootScope.invoiceData;
       console.log($scope.invdata);
       
    }
]);
