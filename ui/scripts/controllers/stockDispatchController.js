courierApp.controller("stockDispatchController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout','$filter',
    function($rootScope, $scope, $location, intermediateService, $timeout,$filter) {

        var counter = 0;
        $rootScope.loginPage = true;
        $scope.datalist = [{
            product: 'new' + counter
        }]
        $scope.countries = [];
        $scope.listofproduct = [];
        $scope.modeOfPayment = 'cash'
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
                    $scope.listofproduct.push(productlist);
                    console.log('called');
                }
            console.log($scope.listofproduct);
        })
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
            $rootScope.invoiceDetails ={}
            $rootScope.couriername = $scope.courierCenter.name
            $rootScope.invoiceDetails.toAddress = $scope.address;
            $rootScope.invoiceDetails.invoiceDate = $filter('date')($scope.enterDate, "yyyy-MM-dd");
            $rootScope.modeOfPayment = $scope.modeOfPayment;
            $rootScope.invoiceDetails.courierCenter ={}
            $rootScope.invoiceDetails.courierCenter.id = $scope.courierCenter.id;
            $rootScope.products = []
            $rootScope.dummy = []

            console.log($scope.datalist);
            for(i in $scope.datalist){
                console.log($scope.datalist[i]);
                console.log($scope.datalist[i].selectedproduct);
                if($scope.datalist[i].selectedproduct != undefined){
                $rootScope.products[i] = {};
                $rootScope.products[i].product = {}
                $rootScope.products[i].product.id = $scope.datalist[i].selectedproduct.id;
                $rootScope.products[i].expiryDate = $filter('date')($scope.datalist[i].expDate, "yyyy-MM-dd");
                $rootScope.products[i].invoiceNumber = $scope.datalist[i].invoice;
                $rootScope.products[i].quantity = $scope.datalist[i].quantity;
                $rootScope.dummy[i] = {};
                $rootScope.dummy[i].product = {}
                $rootScope.dummy[i].product.name = $scope.datalist[i].selectedproduct.name;
                $rootScope.dummy[i].expiryDate = $filter('date')($scope.datalist[i].expDate, "yyyy-MM-dd");
                $rootScope.dummy[i].invoiceNumber = $scope.datalist[i].invoice;
                $rootScope.dummy[i].quantity = $scope.datalist[i].quantity;
                
                }
            } 
            console.log($rootScope.invoiceDetails);
            //$location.path('/invoice');
            var checker = {};
            checker.invoiceDetails = {};
            checker.invoiceDetails = $rootScope.invoiceDetails;
            checker.products = [];
            checker.products = $rootScope.products;
            intermediateService.stockDispatch(checker,function(response) {
            console.log(response.data);
            $rootScope.invID = response.data.invoiceDetails.id
            $location.path('/invoice');
            
        })

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

       $scope.invdata  = $rootScope.invoiceDetails;
       $scope.prd = $rootScope.dummy
       console.log($scope.invdata);
       
    }
]);
