courierApp.controller("productEntryController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout',
    function($rootScope, $scope, $location, intermediateService, $timeout) {

        $scope.product = {};
        $scope.products = [];
        $rootScope.loginPage = true;
        $scope.save = function() {
            console.log('save called');
            if ($scope.productform.$valid) {
                $scope.submitted = false;
                var fd = new FormData();
               
                fd.append('photo', $scope.productImage);
                fd.append('product', angular.toJson($scope.product, true));
                console.log(fd);
                intermediateService.saveProduct(fd, function(response) {
                    if (response.statusCode == 1) {
                        $scope.regSuccess = true;
                        $timeout(function() {
                            $scope.regSuccess = false;
                            $scope.getproducts();
                        }, 2000);

                    } else if (response.statusCode == 0) {
                        console.log('failed');
                        $scope.regError = true;
                        $timeout(function() {
                            $scope.regError = false;
                        }, 2000);
                    }
                });
            } else {
                console.log('invalid called');
                $scope.submitted = true;
            }


        }
        $scope.getproducts = function() {
            intermediateService.productlist(function(response) {
                console.log(response);
                $scope.products = response.data;
                for(i in response.data){
                    if(response.data[i].photoFileName != null){
                        $scope.products[i].photo = $rootScope.urlBase +"product/download/photo/" + response.data[i].id;
                    }
                    else{
                        console.log('null')
                    }
                    
                }
                
                console.log($scope.products);
            })
        }
        $scope.getproducts();
        $scope.setimage = function() {
                console.log('called');
                var file = $scope.productImage;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    $scope.$apply(function() {
                        $scope.ImageSrc = e.target.result;
                        
                    });

                }
            }
            $scope.productModify = function(data){
                console.log(data);
                $scope.productEdit = {};
                $scope.productEdit = angular.copy(data);
            }
    }
]);
