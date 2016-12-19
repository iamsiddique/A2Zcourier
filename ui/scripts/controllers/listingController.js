courierApp.controller("listingController",['$scope','$location','intermediateService','$timeout',
 function ($scope,$location,intermediateService,$timeout) {

 	$scope.listofBoys;
 	$scope.totalPages = 0;
	$scope.listit = function (){
		intermediateService.listBoys(function(response) {
			if(response.statusCode == 1){
				
				$scope.listofBoys = response.data;
				$scope.retrivalerr = false;
				$scope.currentPage = 0;
    			$scope.pageSize = 6;
    			$scope.selectedPage = 0;
    			
    			$scope.totalPages = Math.ceil(response.data.length/$scope.pageSize);
    			$scope.getNumber = function(num) {
    				return new Array(num);   
    			}
    			$scope.setPage = function () {
    				$scope.selectedPage = this.$index;
    				$scope.listofBoyss = ($scope.selectedPage*$scope.pageSize);
    			};
    			$scope.pageButtonDisabled = function(dir) {
    				if (dir == -1) {
    					return $scope.currentPage == 0;
    				}
    				return $scope.currentPage >= response.data.length/$scope.pageSize - 1;
    			}
    			$scope.paginate = function(nextPrevMultiplier) {
    				$scope.currentPage += (nextPrevMultiplier * 1);
    				$scope.listofBoyss = ($scope.currentPage*$scope.pageSize);
    			}

			}
			else if (response.statusCode == 0) {
				$scope.retrivalerr = true;
				
			}
		});		
	}
	$scope.sortColumn = 'name';
	$scope.reverseSort = false;
	$scope.sortData = function (column){
		$scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort :false;		
		$scope.sortColumn = column;
	}

	$scope.arrowStyle = function (column){
		if ($scope.sortColumn == column){
			return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
		}

		return '';
	}
	$scope.logout = function(){		
		localStorage.removeItem('userLoggedin');
		$location.path('/login');
	}
	$scope.checkIndex = function (data) {
		console.log(data);		 
		$scope.courierBoy = data;
		console.log($scope.courierBoy);
	}
	$scope.checkingit = function(data){
		
		$scope.delId = data;
		
	}
	$scope.delete = function () {
		
		intermediateService.deleteBoys($scope.delId, function(response) {
			console.log('success');	
			intermediateService.listBoys(function(response) {
				if(response.statusCode == 1){
					$scope.listofBoys = response.data;
				}
				console.log('refreshed');
			});

		});
		console.log($scope.delId);		 
		/*$scope.courierBoy = data;
		console.log($scope.courierBoy);*/
	}
}]);