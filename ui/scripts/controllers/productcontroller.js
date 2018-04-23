courierApp.controller("productEntryController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout','$window',
    function($rootScope, $scope, $location, intermediateService, $timeout,$window) {

        $scope.product = {};
        $scope.products = [];
        $rootScope.loginPage = true;
        $scope.save = function() {
            $scope.loader = true;
            if ($scope.productform.$valid) {
                $scope.submitted = false;
                var fd = new FormData();
                fd.append('photo', $scope.productImage);
                fd.append('product', angular.toJson($scope.product, true));
                intermediateService.saveProduct(fd, function(response) {
                    if (response.statusCode == 1) {
                        $scope.regSuccess = true;
                        $scope.loader = false;
                        $timeout(function() {
                            $scope.regSuccess = false;
                            $scope.getproducts();
                        }, 2000);
                        $scope.product = {};
                        $scope.productImage = {};
                        $scope.ImageSrc = '';
                        $scope.productDownload = '';

                    } else if (response.statusCode == 0) {
                        $scope.regError = true;
                        $scope.loader = false;
                        $timeout(function() {
                            $scope.regError = false;
                        }, 2000);
                    }
                });
            } else {
                $scope.submitted = true;
                $scope.loader = false;
            }


        }
        $scope.getproducts = function() {
            $scope.loader = true;
            intermediateService.productlist(function(response) {
                console.log(response);
                $scope.products = response.data;
                for (i in response.data) {
                    if (response.data[i].photoFileName != null) {
                        $scope.products[i].photo = $rootScope.urlBase + "product/download/photo/" + response.data[i].id;
                    } else {
                        console.log('null')
                    }
                }
                $scope.loader = false;
            })
        }
        $scope.getproducts();
        $scope.setimage = function() {
            var file = $scope.productImage;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                $scope.$apply(function() {
                    $scope.ImageSrc = e.target.result;
                });
            }
        }
        $scope.productModify = function(data) {
            $window.scrollTo(0, 0);
            $scope.product = {};
            $scope.productImage = {};
            $scope.ImageSrc = '';
            $scope.productDownload = '';
            $scope.editData = true;
            $scope.product = angular.copy(data);
            $scope.productDownload = $rootScope.urlBase + "product/download/photo/" + data.id;
            // saveEditProduct
        }

        $scope.saveEditProduct = function() {
            $scope.loader = true;
            if ($scope.product.name && $scope.product.code) {
                $scope.submitted = false;
                var fd = new FormData();
                fd.append('photo', $scope.productImage);
                var data = {
                    'name': $scope.product.name,
                    'code': $scope.product.code,
                    'id': $scope.product.id
                }
                fd.append('product', angular.toJson(data, true));
                intermediateService.saveEditProduct(fd, function(response) {
                    if (response.statusCode == 1) {
                        $scope.regSuccess = true;
                        $timeout(function() {
                            $scope.regSuccess = false;
                            $scope.getproducts();
                        }, 2000);
                        $scope.product = {};
                        $scope.productImage = {};
                        $scope.ImageSrc = '';
                        $scope.productDownload = '';
                        $scope.editData = false;

                    } else if (response.statusCode == 0) {
                        $scope.regError = true;
                        $scope.loader = false;
                        $timeout(function() {
                            $scope.regError = false;
                        }, 2000);
                    }
                });
            } else {
                console.log('invalid called');
                $scope.submitted = true;
                $scope.loader = false;
            }
        }
        $scope.cancelEdit = function() {
            $scope.editData = false;
            $scope.product = {};
            $scope.productImage = {};
            $scope.ImageSrc = '';
            $scope.productDownload = '';
        }
    }
]);