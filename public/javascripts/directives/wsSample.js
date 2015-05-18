app.directive('ipreoWsSample', function () {
	
	var controller = ['$scope', function ($scope) {
		$scope.view = "/partials/wsSample/listContainer";

		$scope.$on('sampleSelected', function (e, s) {
			$scope.view = '/partials/wsSample/detailContainer';
			$scope.sample = s;
		});

		$scope.clickBack = function () {
			$scope.view = "/partials/wsSample/listContainer";
			//$scope.sample = null;
		};
	}];

	var link = function (scope, ele, attrs) {
	};

	return {
		restrict: 'E',
		scope: {
			samples: '='
		},
		templateUrl: '/partials/wsSample/index',
		controller: controller,
		link: link
	}
});