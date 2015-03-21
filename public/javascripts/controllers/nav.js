app.controller('NavCtrl', function ($scope, appData) {
	$scope.groups = [];
	appData.getNavCollections().then(function (d) {
		var arr = [];
		$.each(d.collections, function (k, v) {
			arr.push(v.collection);
			//$.each()
		});

		$scope.groups = arr;
	})
});