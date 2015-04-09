app.controller('WebServCtrl', function ($scope, $state, ws) {
	$scope.package = {};
	console.log($state.params.subGroup);

	ws.getPackageJson($state.params.subGroup).then(function (d) {
		console.log(d);
		$scope.package = d;
	});
});