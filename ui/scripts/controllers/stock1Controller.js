courierApp.controller("stockEntryController1", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$filter',
    function($rootScope, $scope, $location, intermediateService, $timeout, $filter) {

        $scope.viewForm = false;
        $scope.stock = {};
        $scope.loader = false;
        $scope.stock.warehouse = undefined;
        $scope.stock.productname = undefined;
        
			$scope.loader = false;
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
            
			$scope.loader = true;
            for (i in response.data)
                if (response.data[i].name != null) {
                    var productlist = {}
                    productlist.name = response.data[i].name;
                    productlist.id = response.data[i].id;
                    productlist.code = response.data[i].code;
                    $scope.products.push(productlist);
                }
            
			$scope.loader = false;
        })
        
        $scope.enter = function() {
            if(typeof($scope.searchProduct)=='object'){
                $scope.stock.product = $scope.searchProduct;
                $scope.productImageSrc = $rootScope.urlBase + "product/download/photo/" + $scope.stock.product.id;
                $scope.viewForm = true;
            }else{
                var flag = false;
                for(ite in $scope.products){
                    if($scope.products[ite].code==$scope.searchProduct){
                        $scope.stock.product = $scope.products[ite];
                        $scope.productImageSrc = $rootScope.urlBase + "product/download/photo/" + $scope.stock.product.id;
                       flag = true;
                       break; 
                    }
                }
                if(flag){
                $scope.viewForm = true;
            }else{
                $scope.viewForm = false;
            }
            }
          }  
          $scope.cancel = function(){
            $scope.viewForm = false;
            $scope.resetForm();
          }
        $scope.save = function() {
            if ($scope.stockform.$valid && formValidator($scope.stock.courierCenter)) {
                $scope.submitted = false;
                $scope.loader = true;
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
                    if (response.statusCode === '1') {
                        $scope.resetForm();
                        $scope.today();
                        $scope.loader = false;
                        $.toaster({
                            priority: 'success',
                            title: 'Success',
                            message: 'Stock added successfully',
                            settings : {
                                'timeout'      : 2500,
                            }
                        });
                       
                    } else if (response.statusCode === '0' || response.statusCode === '2') {
                        var desc = response.description;
                        $scope.loader = false;
                        $.toaster({
                            priority: 'danger',
                            title: 'Error',
                            message: desc,
                            settings : {
                                'timeout'      : 2500,
                            }
                        });
                        
                    }
                });
            } else {
                $scope.submitted = true;
            }
        }
        function formValidator(ccdata) {
            if (typeof (ccdata) === 'object' && Object.keys(ccdata).length !== 0) {
               return true;                
            } else {
                $.toaster({
                    priority: 'danger',
                    title: 'Error',
                    message: 'Select a valid courier center',
                    settings : {
                        'timeout'      : 2500,
                    }
                });
                return false
            }

        }
        $scope.resetForm = function() {
            $scope.viewForm = false;
            $scope.stock = {};
            $scope.searchProduct="";
            $scope.productImageSrc='';

        };
        $scope.today = function() {
            $scope.stock.manuDate = new Date();
            $scope.stock.expDate = new Date();
            $scope.stock.enterDate = new Date();
        };
        

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
            $scope.popup3.opened = true;
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
        $scope.disabled = function (date, mode) {
            return false;
        };
        $scope.today();
        


    }
]);
