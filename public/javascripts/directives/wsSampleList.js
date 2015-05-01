app.directive('ipreoWsSampleList', function () {
	
	var controller = ['$scope', function ($scope) {
		$scope.sample = null;

		$scope.clickSample = function (s) {
			$scope.sample = s;
		}
	}];

	var link = function (scope, ele, attrs) {
	};

	return {
		restrict: 'E',
		scope: {
			samples: '='
		},
		templateUrl: '/partials/wsSampleList',
		controller: controller,
		link: link
	}
});