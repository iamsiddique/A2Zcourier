courierApp.controller("employeeDetailsController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

        $scope.employeeDetails = {};
        $rootScope.loginPage = true;
        $scope.countries = [];
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
        $scope.save = function() {
            console.log('save called');
            if ($scope.empdetailsform.$valid) {
                courierCenter = {};

                courierCenter.id = $scope.employeeDetails.courierCenter.id;
                console.log(courierCenter);
                $scope.submitted = false;
                console.log('valid called');
                var fd = new FormData();
                fd.append('dl', $scope.drivingLicense);
                fd.append('pan', $scope.pancard);
                fd.append('photo', $scope.photo);
                fd.append('user', angular.toJson($scope.employeeDetails, true));
                console.log(fd);
                // intermediateService.employeeAdd(fd, function(response) {
                //     if (response.statusCode == 1) {
                //         $scope.regSuccess = true;
                //         $timeout(function() {
                //             $scope.regSuccess = false;
                //             $location.path('/list');
                //         }, 2000);

                //     } else if (response.statusCode == 0) {
                //         console.log('failed');
                //         $scope.regError = true;
                //         $timeout(function() {
                //             $scope.regError = false;
                //         }, 2000);
                //     }
                // });
            } else {
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

    }
]);
