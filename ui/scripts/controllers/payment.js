courierApp.controller("payment", ['$rootScope', '$scope', '$location', 'intermediateService', 'logCheck', '$timeout', '$sessionStorage',
	function ($rootScope, $scope, $location, intermediateService, logCheck, $timeout, $sessionStorage) {

		$scope.loader = false;
		$scope.paidDetails = false
		$scope.listofBoys;
		$rootScope.loginPage = true;
		$scope.totalPages = 0;
		$scope.listit = function () {
			$scope.loader = true;
			intermediateService.listBoys(function (response) {
				if (response.statusCode == 1) {
					$scope.listofBoys = response.data;
					$scope.retrivalerr = false;
					$scope.currentPage = 0;
					$scope.pageSize = 6;
					$scope.selectedPage = 0;

					$scope.totalPages = Math.ceil(response.data.length / $scope.pageSize);
					$scope.getNumber = function (num) {
						return new Array(num);
					}
					$scope.setPage = function () {
						$scope.selectedPage = this.$index;
						$scope.listofBoyss = ($scope.selectedPage * $scope.pageSize);
					};
					$scope.pageButtonDisabled = function (dir) {
						if (dir == -1) {
							return $scope.currentPage == 0;
						}
						return $scope.currentPage >= response.data.length / $scope.pageSize - 1;
					}
					$scope.paginate = function (nextPrevMultiplier) {
						$scope.currentPage += (nextPrevMultiplier * 1);
						$scope.listofBoyss = ($scope.currentPage * $scope.pageSize);
					}
					$scope.loader = false;

				} else if (response.statusCode == 0) {
					$scope.retrivalerr = true;
					$scope.loader = false;

				}
			});
		}
		$scope.sortColumn = 'name';
		$scope.reverseSort = false;
		$scope.sortData = function (column) {
			$scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
			$scope.sortColumn = column;
		}

		$scope.arrowStyle = function (column) {
			if ($scope.sortColumn == column) {
				return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
			}
			return '';
		}
		$scope.deliveredDetails = function(data){
			$scope.paidDetails = true
			var id = data.user.id;
			$scope.getDeliveredList(id);
			$scope.getPaidList(id);
		}
		$scope.hidePaidDetails = function(data){
			$scope.paidDetails = false
			
		}

		$scope.checkIndex = function (data) {
			console.log(data);
			$scope.courierBoy = data;
			$scope.rtDownload = $rootScope.urlBase + "courierboy/download/rt/" + data.id;
			$scope.rcDownload = $rootScope.urlBase + "courierboy/download/rc/" + data.id;
			$scope.insuranceDownload = $rootScope.urlBase + "courierboy/download/insurance/" + data.id;
			$scope.dlDownload = $rootScope.urlBase + "courierboy/download/dl/" + data.id;
			$scope.photoDownload = $rootScope.urlBase + "courierboy/download/photo/" + data.id;
		}
		
		
		$scope.setimage = function () {
			var file = $scope.photo;
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function (e) {
				$scope.$apply(function () {
					$scope.ImageSrc = e.target.result;
				});
			}
		}
		

		$scope.retrivalDeliverederr = true;
		$scope.retrivalPaiderr = true;
		$scope.getDeliveredList = function (id) {
			$scope.myDeliveredCourierList = [];
			//var id = $sessionStorage.logindetails.id;
			intermediateService.deliveredList(id, function (response) {
				if (response.statusCode == 1) {
					for (i in response.data) {
						$scope.myDeliveredCourierList.push(response.data[i]);
					}
					$scope.retrivalDeliverederr = false;
				} else if (response.statusCode == 0) {
					$scope.retrivalDeliverederr = true;
				}
			})
		}
		$scope.getPaidList = function (id) {
			$scope.myPaidList = [];
			//var id = $sessionStorage.logindetails.id;
			intermediateService.paidList(id, function (response) {
				if (response.statusCode == 1) {
					for (i in response.data) {
						$scope.myPaidList.push(response.data[i]);
					}
					$scope.retrivalPaiderr = false;
				} else if (response.statusCode == 0) {
					$scope.retrivalPaiderr = true;
				}

			})
		}

	}
]);