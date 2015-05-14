app.directive('ipreoWsSampleList', function () {
	
	var controller = ['$scope', function ($scope) {
		$scope.clickSample = function (s) {
			$scope.sample = s;
		}
	}];

	var link = function (scope, ele, attrs) {
	};

	return {
		restrict: 'E',
		templateUrl: '/partials/wsSampleList',
		controller: controller,
		link: link
	}
});