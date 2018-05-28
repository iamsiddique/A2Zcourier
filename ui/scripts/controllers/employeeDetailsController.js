courierApp.controller("employeeDetailsController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

        $scope.employeeDetails = {};
        $rootScope.loginPage = true;
        $scope.countries = [];
        intermediateService.centerlist(function(response) {
            for (i in response.data)
                if (response.data[i].pincode != null) {
                    var pincode = {}
                    pincode.name = response.data[i].pincode;
                    pincode.id = response.data[i].id;
                    $scope.countries.push(pincode);
                }
        })
        $scope.save = function() {
            if ($scope.empdetailsform.$valid) {
                courierCenter = {};
                courierCenter.id = $scope.employeeDetails.courierCenter.id;
                $scope.submitted = false;
                var fd = new FormData();
                fd.append('dl', $scope.drivingLicense);
                fd.append('pan', $scope.pancard);
                fd.append('photo', $scope.photo);
                fd.append('user', angular.toJson($scope.employeeDetails, true));
                
            } else {
                $scope.submitted = true;
            }


        }
        $scope.setimage = function() {
            var file = $scope.photo;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                $scope.$apply(function() {
                    $scope.ImageSrc = e.target.result;
                });

            }
        }

    }
]);
