app.directive('ipreoWsSampleList', function () {
	
	var controller = ['$scope', function ($scope) {
		$scope.clickSample = function (s) {
			$scope.$emit('sampleSelected', s);
		}
	}];

	var link = function (scope, ele, attrs) {
	};

	return {
		restrict: 'E',
		templateUrl: '/partials/wsSample/list.jade',
		controller: controller,
		link: link
	}
});