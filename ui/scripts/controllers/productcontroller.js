courierApp.controller("productEntryController", ['$rootScope', '$scope', '$location', 'intermediateService', '$timeout', '$window',
    function ($rootScope, $scope, $location, intermediateService, $timeout, $window) {

        $scope.product = {};
        $scope.products = [];
        $rootScope.loginPage = true;
        $scope.wholeSaleList = [];
        var count = 0;  
        $scope.wholeSaleList[count] = {}; 
        $scope.initializeField = function(data){
            if(!data){
                $scope.wholeSaleList = [];
                count = 0;  
                $scope.wholeSaleList[count] = {}; 
            }
        }
        $scope.addWholesaleCost = function(){
            if($scope.wholeSaleList.length != 5){
            count++
            $scope.wholeSaleList[count] = {};
            }
        }
        $scope.deleteAddWholesaleCost = function(index){
            if($scope.wholeSaleList.length != 0){
                $scope.wholeSaleList.splice(index, 1);
                count--;
            }           
        }
        var Reddit = function () {
            this.items = [];
            this.busy = false;
            this.after = 0;
        };
        $scope.reddit = new Reddit();
        $scope.save = function () {
            $scope.loader = true;
            if ($scope.productform.$valid) {
                $scope.submitted = false;
                var fd = new FormData();
                fd.append('photo', $scope.productImage);
                fd.append('product', angular.toJson($scope.product, true));
                intermediateService.saveProduct(fd, function (response) {
                    if (response.statusCode == 1) {
                        $.toaster({
                            priority: 'success',
                            title: 'Success',
                            message: 'Product Added successfully',
                            settings: {
                                'timeout': 2500,
                            }
                        });
                        $scope.loader = false;
                        $timeout(function () {
                            $scope.getproducts();
                        }, 2000);
                        $scope.product = {};
                        $scope.productImage = {};
                        $scope.ImageSrc = '';
                        $scope.productDownload = '';

                    } else if (response.statusCode == 0) {
                        var desc = response.description;
                        $.toaster({
                            priority: 'danger',
                            title: 'Error',
                            message: desc,
                            settings: {
                                'timeout': 2500,
                            }
                        });
                        $scope.loader = false;

                    }
                });
            } else {
                $scope.submitted = true;
                $scope.loader = false;
            }


        }
        $scope.getproducts = function () {
            $scope.loader = true;
            intermediateService.productlist(function (response) {
                $scope.products = response.data;
                for (i in response.data) {
                    if (response.data[i].photoFileName != null) {
                        $scope.products[i].photo = $rootScope.urlBase + "product/download/photo/" + response.data[i].id;
                    }
                }
                $scope.duplicateProduct = angular.copy($scope.products);
                $scope.reddit.after = 0;
                $scope.reddit.items = [];
                $scope.reddit.nextPage();
                $scope.loader = false;
            })
        }
        $scope.getproducts();
        $scope.setimage = function () {
            var file = $scope.productImage;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.ImageSrc = e.target.result;
                });
            }
        }
        $scope.productModify = function (data) {
            $window.scrollTo(0, 0);
            $scope.product = {};
            $scope.productImage = {};
            $scope.ImageSrc = '';
            $scope.productDownload = '';
            $scope.editData = true;
            $scope.product = angular.copy(data);
            $scope.productDownload = data.newurl; // $rootScope.urlBase + "product/download/photo/" + data.id;
            // saveEditProduct
        }

        $scope.saveEditProduct = function () {
            $scope.loader = true;
            if ($scope.product.name && $scope.product.code) {
                $scope.submitted = false;
                var fd = new FormData();
                fd.append('photo', $scope.productImage);
                var data = {
                    'name': $scope.product.name,
                    'code': $scope.product.code,
                    'id': $scope.product.id,
                    'cost': $scope.product.cost,
                    'cgst': $scope.product.cgst,
                    'sgst': $scope.product.sgst
                }
                fd.append('product', angular.toJson(data, true));
                intermediateService.saveEditProduct(fd, function (response) {
                    if (response.statusCode == 1) {
                        $.toaster({
                            priority: 'success',
                            title: 'Success',
                            message: 'Product Edited successfully',
                            settings: {
                                'timeout': 2500,
                            }
                        });
                        $timeout(function () {
                            $scope.getproducts();
                        }, 2000);
                        $scope.product = {};
                        $scope.productImage = {};
                        $scope.ImageSrc = '';
                        $scope.productDownload = '';
                        $scope.editData = false;

                    } else if (response.statusCode == 0) {
                        var desc = response.description;
                        $.toaster({
                            priority: 'danger',
                            title: 'Error',
                            message: desc,
                            settings: {
                                'timeout': 2500,
                            }
                        });
                        $scope.loader = false;

                    }
                });
            } else {
                $scope.submitted = true;
                $scope.loader = false;
            }
        }
        $scope.cancelEdit = function () {
            $scope.editData = false;
            $scope.product = {};
            $scope.productImage = {};
            $scope.ImageSrc = '';
            $scope.productDownload = '';
        }
        $scope.searchProducts = function () {
            //$scope.loader = true;
            var data = angular.copy($scope.products),
                dataArray = [];
            if ($scope.searchProduct) {
                for (i in data) {
                    if (data[i].name.toLowerCase().includes($scope.searchProduct.toLowerCase()) || data[i].code.toLowerCase().includes($scope.searchProduct.toLowerCase())) {
                        dataArray.push(data[i]);
                    }
                }
                $scope.duplicateProduct = dataArray;
                $scope.reddit.after = 0;
                $scope.reddit.items = [];
                $scope.reddit.nextPage();
            } else {
                $scope.duplicateProduct = data;
                $scope.reddit.after = 0;
                $scope.reddit.items = [];
                $scope.reddit.nextPage();
            }
        }




        //Reddit.prototype.after = 0;
        Reddit.prototype.nextPage = function () {
            if (this.busy) return;
            this.busy = true;
            var endLimit = this.after + 10;
            if (endLimit >= $scope.duplicateProduct.length) {
                endLimit = $scope.duplicateProduct.length;
            }
            for (var i = this.after; i < endLimit; i++) {
                this.items.push($scope.duplicateProduct[i]);
            }
            this.after = this.after + 10;
            this.busy = false;

            // var url = "https://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
            // $http.jsonp(url).success(function(data) {
            //   var items = data.data.children;
            //   for (var i = 0; i < items.length; i++) {
            //     this.items.push(items[i].data);
            //   }
            //   this.after = "t3_" + this.items[this.items.length - 1].id;
            //   this.busy = false;
            // }.bind(this));
        };
       

    }
]);