app.controller('NavCtrl', function ($scope, navData, $state) {
	$scope.groups;
	$scope.subGroups;
	$scope.group;
	$scope.subGroup;

	$scope.setState = function (sg) {
		//ensure that group or subgroup changed before changing state
		navData.getGroup().then(function (grp) {
			if ($scope.subGroup !== sg || $scope.group !== grp) {
				$scope.subGroup = sg;
				$state.go($state.current.name, {group: $scope.group, subGroup: sg});
			}
		});
	};

	$scope.setGroup = function (g) {
		$scope.group = g;
		navData.getSubGroups(g).then(function (d) {
			$scope.subGroups = d;
		});
	};

	navData.getGroups().then(function (d) {
		$scope.groups = d;
	});

	navData.getGroup().then(function (d) {
		$scope.group = d;
	});

	navData.getSubGroup().then(function (d) {
		$scope.subGroup = d;
	});

	navData.getSubGroups().then(function (d) {
		$scope.subGroups = d;
	});

});