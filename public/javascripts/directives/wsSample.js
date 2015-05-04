app.directive('ipreoWsSample', function () {
	
	var controller = ['$scope', function ($scope) {
		$scope.sample = null;
		$scope.title = "Sample Calls";
	}];

	var link = function (scope, ele, attrs) {
	};

	return {
		restrict: 'E',
		scope: {
			samples: '=',
			sample: '='
		},
		templateUrl: '/partials/wsSample',
		controller: controller,
		link: link
	}
});