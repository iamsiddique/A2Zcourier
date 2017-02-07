courierApp.directive('fileUpload', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileUpload);
                var modelSetter = model.assign;
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
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