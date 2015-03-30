app.controller('NavCtrl', function ($scope, navData, $state) {
	$scope.col;

	$scope.setState = function (sg) {
		//ensure that group or subgroup changed before changing state
		/*navData.getGroup().then(function (grp) {
			if ($scope.subGroup !== sg || $scope.group !== grp) {
				$scope.subGroup = sg;
				$state.go($state.current.name, {group: $scope.group, subGroup: sg});
			}
		});*/
	};

	navData.getCurrentCollection().then(function (d) {
		console.log(d);
		$scope.col = d;
	})

});