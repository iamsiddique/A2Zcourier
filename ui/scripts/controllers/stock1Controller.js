courierApp.controller("stockEntryController1", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$filter',
    function($rootScope, $scope, $location, intermediateService, $timeout, $filter) {

        $scope.viewForm = false;
        $scope.stock = {};
        $scope.stock.warehouse = undefined;
        $scope.stock.productname = undefined;
        $rootScope.loginPage = true;
        $scope.countries = [];
        $scope.products = [];
        intermediateService.centerlist(function(response) {
            console.log(response);
            for (i in response.data)
                if (response.data[i].pincode != null) {
                    var pincode = {}
                    pincode.name = response.data[i].pincode;
                    pincode.id = response.data[i].id;
                    $scope.countries.push(pincode);
                    console.log('called');
                }
            console.log($scope.countries);
        })
        intermediateService.productlist(function(response) {
            console.log(response);
            for (i in response.data)
                if (response.data[i].name != null) {
                    var productlist = {}
                    productlist.name = response.data[i].name;
                    productlist.id = response.data[i].id;
                    productlist.code = response.data[i].code;
                    $scope.products.push(productlist);
                    console.log('called');
                }
            console.log($scope.products);
        })
        // $scope.preEnter = function(){
        //     if(typeof($scope.searchProduct)=='object'){
        //         $scope.stock.product = $scope.searchProduct;
        //         $scope.productImageSrc = $rootScope.urlBase + "product/download/photo/" + $scope.stock.product.id;
        //         $scope.viewForm = true;
        //     }else{
        //         for(ite in $scope.products){
        //             if($scope.products[ite].code==$scope.searchProduct){
        //                 $scope.stock.product = $scope.products[ite];
        //                 $scope.productImageSrc = $rootScope.urlBase + "product/download/photo/" + $scope.stock.product.id;
        //                flag = true;
        //                break; 
        //             }
        //         }               
        //     }
        // }
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
                    console.log($scope.products[ite].code);
                }
                if(flag){
                $scope.viewForm = true;
            }else{
                $scope.viewForm = false;
            }
            }
          }  
        $scope.save = function() {
            console.log('save called');
            if ($scope.stockform.$valid) {
                $scope.submitted = false;
                console.log($scope.stock);
                var data = {};
                data.product = {}
                data.courierCenter = {};
                data.entryDate = $filter('date')($scope.stock.enterDate, "yyyy-MM-dd");
                data.expiryDate = $filter('date')($scope.stock.expDate, "yyyy-MM-dd");
                data.manufactureDate = $filter('date')($scope.stock.manuDate, "yyyy-MM-dd");
                console.log($scope.stock.quantity);
                data.quantity = $scope.stock.quantity;
                data.product.id = $scope.stock.product.id;
                data.courierCenter.id = $scope.stock.courierCenter.id;
                data.invoiceNumber = $scope.stock.invoiceNumber;
                data.shopName = $scope.stock.shopName;
                console.log(data);
                console.log(JSON.stringify(data));

                intermediateService.stockEntry(data, function(response) {
                    if (response.statusCode == 1) {
                        $scope.regSuccess = true;
                        $scope.resetForm();
                        $timeout(function() {
                            $scope.regSuccess = false;
                            //$location.path('/list');
                        }, 2000);

                    } else if (response.statusCode == 0) {
                        console.log('failed');
                        $scope.regError = true;
                        $timeout(function() {
                            $scope.regError = false;
                        }, 2000);
                    }
                });
            } else {
                console.log('invalid called');
                $scope.submitted = true;
            }


        }
        $scope.resetForm = function() {
            console.log('resetting form');
            $scope.viewForm = false;
            $scope.stock = {};
            $scope.searchProduct="";

        };
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
