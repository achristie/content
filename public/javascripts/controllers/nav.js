app.controller('NavCtrl', function ($scope, navData, $state) {
	$scope.groups = [];

	$scope.$watch(function () {
		return $state.current.url;
	}, function (n, o) {
		if (!n ) { return; }
		appData.getNavCollections(n).then(function (d) {
			var arr = [];
			$.each(d.collections, function (k, v) {
				arr.push(v.collection);
			});

			$scope.groups = arr;
		});
	});
	
});