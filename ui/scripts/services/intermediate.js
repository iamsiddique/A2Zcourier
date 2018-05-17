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
     serviceObject.postCenterEdit = function(data, callback) {
        mainService.postCenterEdit(data).success(function(response) {
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
    serviceObject.postServiceAvl = function(data, callback) {
        mainService.postServiceAvl(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.ServiceAvllist = function(callback) {
        mainService.getServiceAvllist().success(function(response) {
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
    serviceObject.saveEditProduct = function(data, callback) {
        mainService.saveEditProduct(data).success(function(response) {
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
    serviceObject.stockEntryEdit = function(data, callback) {
        mainService.stockEntryEdit(data).success(function(response) {
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
    serviceObject.centerStockEntryList = function(data, callback) {
        mainService.centerStockEntryList(data).success(function(response) {
            console.log(response);
            serviceObject.cstockEntryDetails = response.data
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
    serviceObject.employeelisting = function(callback) {
        mainService.employeelisting().success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    
    serviceObject.stockDispatch = function(data, callback) {
        mainService.stockDispatch(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.getAddress = function(data, callback) {
        mainService.getAddress(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.liststockDispatch = function(callback) {
        mainService.liststockDispatch().success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.invDetail = function(data, callback) {
        mainService.invDetail(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.assignMe = function(data, callback) {
        mainService.assignMe(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.assignedList = function(data, callback) {
        mainService.assignedList(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.markAsDelivered = function(data, callback) {
        mainService.markAsDelivered(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.markAsPaid = function(data, callback) {
        mainService.markAsPaid(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.deliveredList = function(data, callback) {
        mainService.deliveredList(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    serviceObject.paidList = function(data, callback) {
        mainService.paidList(data).success(function(response) {
            console.log(response);
            callback(response);
        }).error(function(response) {
            callback(response);
        });
    };
    
    


    return serviceObject;

}]);
