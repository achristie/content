app.controller('WebServCtrl', function ($scope, $state, ws, davosUrl) {
	$scope.package = {};
	$scope.error = {};
	$scope.hasError = false;

	ws.getWsInfo($state.params.subGroup).then(function (data, status) {
		//0 is package.Json
		//1 is readme.md
		//2 is description.json
		//if any of these fail should display an alert...
		console.log(data, status);
		$scope.package = data[0].data;
		$scope.readme = data[1].data;
		$scope.description = data[2].data;

	}, function (error) {
		$scope.hasError = true;
	});

	$scope.clickComponent = function (c) {
		$scope.component = c;
	}

	$scope.getUrl = function (path, authType) {
		return davosUrl.getUrl(path, authType);
	};
});