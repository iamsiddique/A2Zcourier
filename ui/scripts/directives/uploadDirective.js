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
                    <input name="cost" type="text"  placeholder="Cost" class="form-control input-md" required="">
                    
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
                    <button type="button" class="primary-btn btn" ng-click="remprod(stockdispatch)">-</button>
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
courierApp.directive('noCacheSrc', function($window) {
    return {
      priority: 99,
      scope: {
        returnUrl: '=',
        
      },
      controller:function($scope,$attrs){
        $attrs.$observe('noCacheSrc', function(noCacheSrc) {
            noCacheSrc += '?' + (new Date()).getTime();
            console.log(noCacheSrc);
            $attrs.$set('src', noCacheSrc);
            $scope.returnUrl = angular.copy(noCacheSrc);
          });

      }    
    }
  });
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

courierApp.directive('infiniteScroll', [
    '$rootScope', '$window', '$interval', 'THROTTLE_MILLISECONDS',
    ($rootScope, $window, $interval, THROTTLE_MILLISECONDS) =>
  ({
    scope: {
      infiniteScroll: '&',
      infiniteScrollContainer: '=',
      infiniteScrollDistance: '=',
      infiniteScrollDisabled: '=',
      infiniteScrollUseDocumentBottom: '=',
      infiniteScrollListenForEvent: '@',
    },

    link(scope, elem, attrs) {
      const windowElement = angular.element($window);

      let scrollDistance = null;
      let scrollEnabled = null;
      let checkWhenEnabled = null;
      let container = null;
      let immediateCheck = true;
      let useDocumentBottom = false;
      let unregisterEventListener = null;
      let checkInterval = false;

      function height(element) {
        const el = element[0] || element;

        if (isNaN(el.offsetHeight)) {
          return el.document.documentElement.clientHeight;
        }
        return el.offsetHeight;
      }

      function pageYOffset(element) {
        const el = element[0] || element;

        if (isNaN(window.pageYOffset)) {
          return el.document.documentElement.scrollTop;
        }
        return el.ownerDocument.defaultView.pageYOffset;
      }

      function offsetTop(element) {
        if (!(!element[0].getBoundingClientRect || element.css('none'))) {
          return element[0].getBoundingClientRect().top + pageYOffset(element);
        }
        return undefined;
      }

      // infinite-scroll specifies a function to call when the window,
      // or some other container specified by infinite-scroll-container,
      // is scrolled within a certain range from the bottom of the
      // document. It is recommended to use infinite-scroll-disabled
      // with a boolean that is set to true when the function is
      // called in order to throttle the function call.
      function defaultHandler() {
        let containerBottom;
        let elementBottom;
        if (container === windowElement) {
          containerBottom = height(container) + pageYOffset(container[0].document.documentElement);
          elementBottom = offsetTop(elem) + height(elem);
        } else {
          containerBottom = height(container);
          let containerTopOffset = 0;
          if (offsetTop(container) !== undefined) {
            containerTopOffset = offsetTop(container);
          }
          elementBottom = (offsetTop(elem) - containerTopOffset) + height(elem);
        }

        if (useDocumentBottom) {
          elementBottom = height((elem[0].ownerDocument || elem[0].document).documentElement);
        }

        const remaining = elementBottom - containerBottom;
        const shouldScroll = remaining <= (height(container) * scrollDistance) + 1;

        if (shouldScroll) {
          checkWhenEnabled = true;

          if (scrollEnabled) {
            if (scope.$$phase || $rootScope.$$phase) {
              scope.infiniteScroll();
            } else {
              scope.$apply(scope.infiniteScroll);
            }
          }
        } else {
          if (checkInterval) { $interval.cancel(checkInterval); }
          checkWhenEnabled = false;
        }
      }

      // The optional THROTTLE_MILLISECONDS configuration value specifies
      // a minimum time that should elapse between each call to the
      // handler. N.b. the first call the handler will be run
      // immediately, and the final call will always result in the
      // handler being called after the `wait` period elapses.
      // A slimmed down version of underscore's implementation.
      function throttle(func, wait) {
        let timeout = null;
        let previous = 0;

        function later() {
          previous = new Date().getTime();
          $interval.cancel(timeout);
          timeout = null;
          return func.call();
        }

        function throttled() {
          const now = new Date().getTime();
          const remaining = wait - (now - previous);
          if (remaining <= 0) {
            $interval.cancel(timeout);
            timeout = null;
            previous = now;
            func.call();
          } else if (!timeout) {
            timeout = $interval(later, remaining, 1);
          }
        }

        return throttled;
      }

      const handler = (THROTTLE_MILLISECONDS != null) ?
        throttle(defaultHandler, THROTTLE_MILLISECONDS) :
        defaultHandler;

      function handleDestroy() {
        container.unbind('scroll', handler);
        if (unregisterEventListener != null) {
          unregisterEventListener();
          unregisterEventListener = null;
        }
        if (checkInterval) {
          $interval.cancel(checkInterval);
        }
      }

      scope.$on('$destroy', handleDestroy);

      // infinite-scroll-distance specifies how close to the bottom of the page
      // the window is allowed to be before we trigger a new scroll. The value
      // provided is multiplied by the container height; for example, to load
      // more when the bottom of the page is less than 3 container heights away,
      // specify a value of 3. Defaults to 0.
      function handleInfiniteScrollDistance(v) {
        scrollDistance = parseFloat(v) || 0;
      }

      scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
      // If I don't explicitly call the handler here, tests fail. Don't know why yet.
      handleInfiniteScrollDistance(scope.infiniteScrollDistance);

      // infinite-scroll-disabled specifies a boolean that will keep the
      // infnite scroll function from being called; this is useful for
      // debouncing or throttling the function call. If an infinite
      // scroll is triggered but this value evaluates to true, then
      // once it switches back to false the infinite scroll function
      // will be triggered again.
      function handleInfiniteScrollDisabled(v) {
        scrollEnabled = !v;
        if (scrollEnabled && checkWhenEnabled) {
          checkWhenEnabled = false;
          handler();
        }
      }

      scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
      // If I don't explicitly call the handler here, tests fail. Don't know why yet.
      handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);

      // use the bottom of the document instead of the element's bottom.
      // This useful when the element does not have a height due to its
      // children being absolute positioned.
      function handleInfiniteScrollUseDocumentBottom(v) {
        useDocumentBottom = v;
      }

      scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
      handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);

      // infinite-scroll-container sets the container which we want to be
      // infinte scrolled, instead of the whole window. Must be an
      // Angular or jQuery element, or, if jQuery is loaded,
      // a jQuery selector as a string.
      function changeContainer(newContainer) {
        if (container != null) {
          container.unbind('scroll', handler);
        }

        container = newContainer;
        if (newContainer != null) {
          container.bind('scroll', handler);
        }
      }

      changeContainer(windowElement);

      if (scope.infiniteScrollListenForEvent) {
        unregisterEventListener = $rootScope.$on(scope.infiniteScrollListenForEvent, handler);
      }

      function handleInfiniteScrollContainer(newContainer) {
        // TODO: For some reason newContainer is sometimes null instead
        // of the empty array, which Angular is supposed to pass when the
        // element is not defined
        // (https://github.com/sroze/ngInfiniteScroll/pull/7#commitcomment-5748431).
        // So I leave both checks.
        if ((!(newContainer != null)) || newContainer.length === 0) {
          return;
        }

        let newerContainer;

        if (newContainer.nodeType && newContainer.nodeType === 1) {
          newerContainer = angular.element(newContainer);
        } else if (typeof newContainer.append === 'function') {
          newerContainer = angular.element(newContainer[newContainer.length - 1]);
        } else if (typeof newContainer === 'string') {
          newerContainer = angular.element(document.querySelector(newContainer));
        } else {
          newerContainer = newContainer;
        }

        if (newerContainer == null) {
          throw new Error('invalid infinite-scroll-container attribute.');
        }
        changeContainer(newerContainer);
      }

      scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
      handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);

      // infinite-scroll-parent establishes this element's parent as the
      // container infinitely scrolled instead of the whole window.
      if (attrs.infiniteScrollParent != null) {
        changeContainer(angular.element(elem.parent()));
      }

      // infinte-scoll-immediate-check sets whether or not run the
      // expression passed on infinite-scroll for the first time when the
      // directive first loads, before any actual scroll.
      if (attrs.infiniteScrollImmediateCheck != null) {
        immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
      }

      function intervalCheck() {
        if (immediateCheck) {
          handler();
        }
        return $interval.cancel(checkInterval);
      }

      checkInterval = $interval(intervalCheck);
      return checkInterval;
    },
  }),

  ]);
