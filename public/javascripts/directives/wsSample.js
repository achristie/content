app.directive('ipreoWsSample', function () {
	
	var controller = ['$scope', function ($scope) {
		
	}];

	var link = function (scope, ele, attrs) {
	};

	return {
		restrict: 'E',
		scope: {
			view: '@'
		},
		templateUrl: '/partials/wsSample',
		controller: controller,
		link: link
	}
});