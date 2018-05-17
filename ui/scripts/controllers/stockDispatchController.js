courierApp.controller("stockDispatchController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$filter',
    function ($rootScope, $scope, $location, intermediateService, $timeout, $filter) {

        var counter = 0;
        $rootScope.loginPage = true;
        $scope.datalist = [{
            product: 'new' + counter,
            cost:0
        }]
        
        $scope.smallLoader = false;
        $scope.countries = [];
        $scope.listofproduct = [];
        $scope.paymentMode = 'cash';
        intermediateService.centerlist(function (response) {
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
        intermediateService.productlist(function (response) {
            console.log(response);
            for (i in response.data)
                if (response.data[i].name != null) {
                    var productlist = {}
                    productlist.name = response.data[i].name + ' - ' + response.data[i].code;
                    productlist.id = response.data[i].id;
                    $scope.listofproduct.push(productlist);
                    console.log('called');
                }
            console.log($scope.listofproduct);
        })
        $scope.addnew = function () {
            counter++;
            $scope.datalist.push({
                product: 'new' + counter,
                cost:0
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
            console.log($scope.dataList);
            var i = 0;
            $scope.totalAmount = 0;
            for (i in $scope.datalist) {
                $scope.totalAmount = $scope.totalAmount + $scope.datalist[i].cost;
                
            }
        }
        $scope.save = function () {
            intermediateService.invoiceDetails = {}
            intermediateService.couriername = $scope.courierCenter.name
            intermediateService.invoiceDetails.toAddress = $scope.address;
            intermediateService.invoiceDetails.mobileNo = $scope.phnumber;
            intermediateService.invoiceDetails.paymentMode = $scope.paymentMode;
            intermediateService.invoiceDetails.invoiceDate = $filter('date')($scope.enterDate, "yyyy-MM-dd");
            intermediateService.modeOfPayment = $scope.modeOfPayment;
            intermediateService.invoiceDetails.courierCenter = {}
            intermediateService.invoiceDetails.courierCenter.id = $scope.courierCenter.id;
            intermediateService.invoiceDetails.amount = $scope.totalAmount;
            intermediateService.products = []
            intermediateService.dummy = []
            for (i in $scope.datalist) {
                console.log($scope.datalist[i]);
                console.log($scope.datalist[i].selectedproduct);
                if ($scope.datalist[i].selectedproduct != undefined) {
                    intermediateService.products[i] = {};
                    intermediateService.products[i].product = {}
                    intermediateService.products[i].product.id = $scope.datalist[i].selectedproduct.id;
                    intermediateService.products[i].expiryDate = $filter('date')($scope.datalist[i].expDate, "yyyy-MM-dd");
                    intermediateService.products[i].invoiceNumber = $scope.datalist[i].invoice;
                    intermediateService.products[i].quantity = $scope.datalist[i].quantity;
                    intermediateService.dummy[i] = {};
                    intermediateService.dummy[i].product = {}
                    intermediateService.dummy[i].product.name = $scope.datalist[i].selectedproduct.name;
                    intermediateService.dummy[i].expiryDate = $filter('date')($scope.datalist[i].expDate, "yyyy-MM-dd");
                    intermediateService.dummy[i].invoiceNumber = $scope.datalist[i].invoice;
                    intermediateService.dummy[i].quantity = $scope.datalist[i].quantity;
                    intermediateService.dummy[i].cost = $scope.datalist[i].cost;
                    //intermediateService.invoiceDetails.amount = intermediateService.invoiceDetails.amount + $scope.datalist[i].cost;

                }
            }
            console.log($rootScope.invoiceDetails);
            //$location.path('/invoice');
            var checker = {};
            checker.invoiceDetails = {};
            checker.invoiceDetails = intermediateService.invoiceDetails;
            checker.products = [];
            checker.products = intermediateService.products;
            intermediateService.stockDispatch(checker, function (response) {
                console.log(response.data);
                $rootScope.invID = response.data.invoiceDetails.id
                $location.path('/invoice');
            })
        }
        $scope.getAddress = function(){
            $scope.smallLoader = true;
            intermediateService.getAddress($scope.phnumber, function (response) {
                if(response.data != null){
                    $scope.address = angular.copy(response.data.address);
                }    
                else{
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

        $scope.invdata = intermediateService.invoiceDetails;
        $scope.invdata.couriername = intermediateService.couriername;
        $scope.prd = intermediateService.dummy

        $scope.demoFromHTML= function() {
            var pdf = new jsPDF('p', 'pt', 'letter');
            // source can be HTML-formatted string, or a reference
            // to an actual DOM element from which the text will be scraped.
            source = $('#idone')[0];
    
            // we support special element handlers. Register them with jQuery-style 
            // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            // There is no support for any other type of selectors 
            // (class, of compound) at this time.
            specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                '#bypassme': function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true
                }
            };
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },
    
            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, margins);
        }
        $scope.export = function(){
            html2canvas(document.getElementById('idone'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500,
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("test.pdf");
                }
            });
        }

    }
]);