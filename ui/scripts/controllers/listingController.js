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
    			
    			$scope.totalPages = Math.ceil(response.data.length/$scope.pageSize);
    			$scope.getNumber = function(num) {
    				return new Array(num);   
    			}
    			$scope.setPage = function () {
    				$scope.selectedPage = this.$index;
    				$scope.listofBoys = response.data.slice($scope.selectedPage*$scope.pageSize);
    			};
    			$scope.pageButtonDisabled = function(dir) {
    				if (dir == -1) {
    					return $scope.currentPage == 0;
    				}
    				return $scope.currentPage >= response.data.length/$scope.pageSize - 1;
    			}
    			$scope.paginate = function(nextPrevMultiplier) {
    				console.log($scope.currentPage);
    				$scope.currentPage += (nextPrevMultiplier * 1);
    				console.log($scope.currentPage);
    				$scope.listofBoys = response.data.slice($scope.currentPage*$scope.pageSize);
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
		
}]);