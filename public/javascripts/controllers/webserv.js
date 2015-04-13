app.controller('WebServCtrl', function ($scope, $state, ws) {
	$scope.package = {};

	ws.getWsInfo($state.params.subGroup).success(function (data, status) {
		//0 is package.Json
		//1 is readme.md
		//2 is description.json
		//if any of these fail should display an alert...
		console.log(data);
		$scope.package = d[0];
		$scope.readme = d[1];
		$scope.description = d[2];
	}).error(function (d) {
		console.log(d);
	});
});