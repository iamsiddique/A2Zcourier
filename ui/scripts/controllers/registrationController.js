courierApp.controller("registrationController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {
        $scope.loader = false;
        $scope.courierBoy = {};
        $scope.courierBoy.vehicleType = '2W';
        $scope.courierBoy.vehicleOwner = 'S';
        $rootScope.loginPage = true;
        $scope.save = function() {
            console.log('save called');
            $scope.loader = true;
            if ($scope.registrationform.$valid) {
                $scope.submitted = false;
                console.log('valid called');
                $scope.courierBoy.user.username = $scope.courierBoy.mobileNumber;
                var fd = new FormData();
                fd.append('dl', $scope.drivingLicense);
                fd.append('rc', $scope.rcdoc);
                fd.append('insurance', $scope.insurance);
                fd.append('rt', $scope.roadTax);
                fd.append('photo', $scope.photo);
                fd.append('user', angular.toJson($scope.courierBoy, true));
                console.log(fd);
                intermediateService.saveBoys(fd, function(response) {
                    if (response.statusCode == 1) {
                        $scope.regSuccess = true;
                        $timeout(function() {
                            $scope.regSuccess = false;
                            $location.path('/list');
                            $scope.loader = false;
                        }, 2000);

                    } else if (response.statusCode == 0) {
                        $scope.errorMsg =response.description;
                        console.log('failed');
                        $scope.regError = true;
                        $scope.loader = false;
                        $timeout(function() {
                            $scope.regError = false;
                        }, 5000);
                        
                    }
                });
            } else {
                $scope.loader = false;
                console.log('invalid called');
                $scope.submitted = true;

            }


        }
        $scope.setimage = function() {
                console.log('called');
                var file = $scope.photo;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    $scope.$apply(function() {
                        $scope.ImageSrc = e.target.result;
                        console.log($scope.ImageSrc);
                    });

                }
            }
            $scope.popup1 = {
                opened: false
            };
    
            $scope.popup2 = {
                opened: false
            };
            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };
            $scope.open2 = function() {
                $scope.popup2.opened = true;
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

            $scope.today = function() {
                $scope.courierBoy.mobileNoIssueDate = new Date();
                $scope.courierBoy.mobileNoReturnDate = new Date();
    
            };
            $scope.today();
    
            $scope.clear = function() {
                $scope.courierBoy.mobileNoIssueDate = null;
                
                $scope.courierBoy.mobileNoReturnDate = null;
            };
    
            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
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
            $scope.toggleMin = function() {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };
    
            $scope.toggleMin();
            $scope.disabled = true;
            //$scope.courierBoy.user.username = $scope.courierBoy.mobileNumber;           
            /*$scope.loadit = function(){
                var filename = event.target.files[0].name;
                console.log(filename);
                $scope.rddoc = event.target.files[0];
                console.log(event.target.files[0]);
            }*/

    }
]);
