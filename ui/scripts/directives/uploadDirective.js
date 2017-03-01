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
                        <input name="firstName" type="text" ng-model="stockdispatch.name" placeholder="Product Name" class="form-control input-md" required="">
                        
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
            addprod:"&",
            remprod:'&'
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
