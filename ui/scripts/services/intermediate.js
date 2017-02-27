courierApp.factory('intermediateService', ['$rootScope', 'mainService', function($rootScope, mainService) {

    var serviceObject = {};

    serviceObject.cstockDetails = [];
    serviceObject.login = function(emailid, password, callback) {
        var data = {
            "username": emailid,
            "password": password
        };

        mainService.postLogin(data).success(function(response) {
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };

    serviceObject.saveBoys = function(courierboyData, callback) {
        var data = courierboyData;

        mainService.postBoys(data).success(function(response) {
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.updateBoys = function(courierboyData, callback) {
        var data = courierboyData;

        mainService.postUpdate(data).success(function(response) {
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.listBoys = function(callback) {

        mainService.getBoys().success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.deleteBoys = function(id, callback) {
        data = id;
        mainService.deleteBoys(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.getArea = function(pin, callback) {
        data = pin;
        mainService.getArea(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.postArea = function(data, callback) {
        mainService.postCenter(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.centerlist = function(callback) {
        mainService.getCenterlist().success(function(response) {
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.centerDelete = function(id, callback) {
        mainService.deleteCenter(id).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.saveProduct = function(data, callback) {
        mainService.saveProduct(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.productlist = function(callback) {
        mainService.getProduct().success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.stockEntry = function(data, callback) {
        mainService.stockEntry(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.centerStockData = function(data, callback) {
        mainService.centerStockData(data).success(function(response) {
            console.log(response);
            serviceObject.cstockDetails = response.data
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.employeeAdd = function(data, callback) {
        mainService.employeeAdd(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };



    return serviceObject;

}]);
