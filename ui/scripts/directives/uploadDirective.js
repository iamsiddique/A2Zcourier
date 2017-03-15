courierApp.directive('fileUpload', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileUpload);

            var modelSetter = model.assign;
            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                    console.log(modelSetter(scope, element[0].files[0]));
                });
                scope.setimage();
            });
        }
    };
}]);
courierApp.directive('stockdispatch', ['$parse', function($parse) {
    return {
        restrict: 'AE',
        template: `
            
                        
                                <td>
                <div class="form-group">
                    <div class="col-md-12">
                    
                         <input name="productname" type="text" ng-model="stockdispatch.selectedproduct" uib-typeahead="product as product.name for product in prodlist | filter:{name:$viewValue}" placeholder="Enter product name" class="form-control
                          autocomplete input-md" required="" typeahead-show-hint="true" typeahead-min-length="0">
                    
                    </div>
                </div>
            </td>
            <td>
                <div class="form-group">
                   
                    <div class="col-md-12">
                        <input name="firstName" type="text" ng-model="stockdispatch.quantity" placeholder="Quantity" class="form-control input-md" required="">
                        
                    </div>
                </div>
            </td>
            <td>
                <div class="form-group">
                    <div class="col-md-12">
                        <input name="firstName" type="text" ng-model="stockdispatch.invoice" placeholder="Invoice Code" class="form-control input-md" required="">
                        
                    </div>
                </div>
            </td>
            <td>
                <div class="form-group">
                    <div class="col-md-12">
                        <p class="input-group">
                            <input name="expdate" type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="stockdispatch.expDate" is-open="popup1.opened" datepicker-options="dateOptions" ng-required="true" close-text="Close" alt-input-formats="altInputFormats" />
                            <span class="input-group-btn">
                                  <button type="button" class="btn btn-default" ng-click="open1()">
                                      <i class="glyphicon glyphicon-calendar"></i>
                                </button>
                            </span>
                        </p>
                    </div>
                </div>
            </td>
            <td><div class="col-md-12">
                <div class="form-group">
                    <button class="primary-btn btn" ng-click="addprod()">+</button>
                </div>
            </div></td>
            <td><div class="col-md-12">
                <div class="form-group">
                    <button class="primary-btn btn" ng-click="remprod(stockdispatch)">-</button>
                </div>
            </div></td>
                               
                
            
            
            
            `,
        scope:{
            stockdispatch:"=",
            prodlist:"=",
            addprod:"&",
            remprod:'&'
            },
        controller:function($scope){
            $scope.today = function() {
           
            $scope.stockdispatch.expDate = new Date();

        };
        $scope.today();

        $scope.clear = function() {
            $scope.stockdispatch.expDate = null;
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

        

        $scope.setDate = function(year, month, day) {           
            $scope.stock.expDate = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
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
        },
        link: function(scope, element, attrs) {

        }
    };
}]);
// courierApp.directive('autoComplete', function($timeout) {
//     return function(scope, iElement, iAttrs) {
//             iElement.autocomplete({
//                 source: scope[iAttrs.uiItems],
//                 select: function() {
//                     $timeout(function() {
//                       iElement.trigger('input');
//                     }, 0);
//                 }
//             });
//     };
// });
