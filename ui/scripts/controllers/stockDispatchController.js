courierApp.controller("stockDispatchController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$filter',
    function ($rootScope, $scope, $location, intermediateService, $timeout, $filter) {

        var counter = 0;
        $rootScope.loginPage = true;
        $scope.datalist = [{
            product: 'new' + counter,
            cost: 0
        }]
        $scope.loader = false;
        $scope.smallLoader = false;
        $scope.countries = [];
        $scope.listofproduct = [];
        $scope.paymentMode = 'cash';
        intermediateService.centerlist(function (response) {
            for (i in response.data)
                if (response.data[i].pincode != null) {
                    var pincode = {}
                    pincode.name = response.data[i].pincode;
                    pincode.id = response.data[i].id;
                    $scope.countries.push(pincode);
                }
        })
        $scope.viewForm = false;
        $scope.getProduct = function (data){
            intermediateService.productlistWarehouse(data.id,function (response) {
            for (i in response.data)
                if (response.data[i].name != null) {
                    var productlist = {}
                    productlist.name = response.data[i].name + ' - ' + response.data[i].code;
                    productlist.id = response.data[i].id;
                    productlist.cost = response.data[i].cost;
                    productlist.sgst = response.data[i].sgst;
                    productlist.cgst = response.data[i].cgst;
                    productlist.totalCost = response.data[i].totalCost;
                    $scope.listofproduct.push(productlist);
                    $scope.viewForm = true;
                }
        })
        }
        
        $scope.addnew = function () {
            counter++;
            $scope.datalist.push({
                product: 'new' + counter,
                cost: 0
            });
        }
        $scope.delete = function (product) {
            var i = 0;
            for (i in $scope.datalist) {
                if ($scope.datalist[i].product === product.product.product) {
                    $scope.datalist.splice(i, 1);
                }
            }
        }
        $scope.totalAmount = 0;
        $scope.total = function () {
            var i = 0;
            $scope.totalAmount = 0;
            for (i in $scope.datalist) {
                if ($scope.datalist[i].totalCostProduct !== undefined) {
                    $scope.totalAmount = $scope.totalAmount + $scope.datalist[i].totalCostProduct;
                }
            }
        }
        $scope.save = function () {
            if ($scope.stockform.$valid && formValidator($scope.courierCenter, $scope.datalist)) {
                $scope.submitted = false;
                $scope.loader = true;
                
                intermediateService.couriername = $scope.courierCenter.name
                intermediateService.invoiceDetails = {
                    'toAddress': $scope.address,
                    'mobileNo': $scope.phnumber,
                    'paymentMode': $scope.paymentMode,
                    'invoiceDate': $filter('date')($scope.enterDate, "yyyy-MM-dd"),
                    'courierCenter': {
                        'id':$scope.courierCenter.id,

                    },
                    'amount' : $scope.totalAmount
                }
                intermediateService.products = []
                intermediateService.dummy = []
                for (i in $scope.datalist) {
                    if ($scope.datalist[i].selectedproduct != undefined) {
                        intermediateService.products[i] = {
                            'product':{
                                'id': $scope.datalist[i].selectedproduct.id,
                                'totalCost' : $scope.datalist[i].selectedproduct.totalCost
                            },
                            'expiryDate': $filter('date')($scope.datalist[i].expDate, "yyyy-MM-dd"),
                            'invoiceNumber': $scope.datalist[i].invoice,
                            'quantity': $scope.datalist[i].quantity,

                        };
                        intermediateService.dummy[i] = {
                            'product':{
                                'name': $scope.datalist[i].selectedproduct.name,
                                'cost' : $scope.datalist[i].selectedproduct.cost,
                                'cgst' : $scope.datalist[i].selectedproduct.cgst,
                                'sgst' : $scope.datalist[i].selectedproduct.sgst,
                                'totalCostProduct' : $scope.datalist[i].totalCostProduct,
                                'totalCost' : $scope.datalist[i].selectedproduct.totalCost
                            },
                            'expiryDate': $filter('date')($scope.datalist[i].expDate, "yyyy-MM-dd"),
                            'invoiceNumber': $scope.datalist[i].invoice,
                            'quantity': $scope.datalist[i].quantity,
                            'cost': $scope.datalist[i].cost
                        };
                    }
                }
                
                var checker = {};
                checker.invoiceDetails = {};
                checker.invoiceDetails = intermediateService.invoiceDetails;
                checker.products = [];
                checker.products = intermediateService.products;
                intermediateService.stockDispatch(checker, function (response) {
                    if (response.statusCode == 1) {
                    $rootScope.invID = response.data.invoiceDetails.id
                    $scope.loader = false;                   
                    $location.path('/invoice');
                }
                else{
                    $scope.loader = false;
                    $.toaster({
                        priority: 'danger',
                        title: 'Error',
                        message: 'Something went wrong',
                        settings : {
                            'timeout'      : 2500,
                        }
                    });
                }
                })
            } else {
                $scope.submitted = true;
                //$.toaster({ priority : 'danger', title : 'Notice', message : 'Your message here'});
            }
        }

        function formValidator(ccdata, prddata) {
            var flag, inv = [];
            if (typeof (ccdata) === 'object' && Object.keys(ccdata).length !== 0) {
                for (i in prddata) {
                    if (typeof (prddata[i].selectedproduct) === 'object' && Object.keys(prddata[i].selectedproduct).length !== 0) {
                        flag = true;
                        inv.push(prddata[i].invoice);
                    } else {
                        $.toaster({
                            priority: 'danger',
                            title: 'Error',
                            message: 'Select a valid product',
                            settings : {
                                'timeout'      : 2500,
                            }
                        });
                        return false
                    }

                }
                if(flag){
                    var sorted_arr = inv.sort(); // You can define the comparing function here. 
                    // JS by default uses a crappy string compare.
                    var results = [];
                    for (var i = 0; i < inv.length - 1; i++) {
                        if (sorted_arr[i + 1] == sorted_arr[i]) {
                            results.push(sorted_arr[i]);
                        }
                    }
                    if(results.length === 0){
                        return true;
                    }
                    else{
                        $.toaster({
                            priority: 'danger',
                            title: 'Error',
                            message: 'Duplicate invoice code is entered',
                            settings : {
                                'timeout'      : 2500,
                            }
                        });
                        return false;
                    }
                }
            } else {
                $.toaster({
                    priority: 'danger',
                    title: 'Error',
                    message: 'Select a valid warehouse',
                    settings : {
                        'timeout'      : 2500,
                    }
                });
                return false
            }

        }
        $scope.getAddress = function () {
            $scope.smallLoader = true;
            intermediateService.getAddress($scope.phnumber, function (response) {
                if (response.data != null) {
                    $scope.address = angular.copy(response.data.address);
                } else {
                    $scope.address = '';
                }
                $scope.smallLoader = false;
            })
        }

        $scope.today = function () {
            $scope.enterDate = new Date();
        };


        $scope.clear = function () {
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

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.open3 = function () {
            $scope.popup3.opened = true;
        };

        $scope.setDate = function (year, month, day) {
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
        $scope.today();
        $scope.toggleMin();


    }
]);
courierApp.controller("invoiceController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$filter',
    function ($rootScope, $scope, $location, intermediateService, $timeout, $filter) {

        if( intermediateService.invoiceDetails === undefined || intermediateService.invoiceDetails === null){
            $location.path('/stockDispatch');
        }
        else{

        $scope.invdata = intermediateService.invoiceDetails;
        $scope.invdata.couriername = intermediateService.couriername;
        $scope.prd = intermediateService.dummy
        console.log($scope.invdata);
        console.log($scope.prd);
        $.toaster({
            priority: 'success',
            title: 'Success',
            message: 'Invoice generated successfully',
            settings : {
                'timeout'      : 2500,
            }
        });
        }

        $scope.printit =  function(){           
            window.print();       
        }
       

    }
]);