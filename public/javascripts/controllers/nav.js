app.controller('NavCtrl', function ($scope, navData, $state) {
	$scope.col;
	var pageNames = ['Content', 'Web Services', 'Data Feeds', 'Widgets'];

	$scope.setState = function (sg) {
		//ensure that group or subgroup changed before changing state
		/*navData.getGroup().then(function (grp) {
			if ($scope.subGroup !== sg || $scope.group !== grp) {
				$scope.subGroup = sg;
				$state.go($state.current.name, {group: $scope.group, subGroup: sg});
			}
		});*/
	};

	$scope.$watch(function () {
		return $state.current.name;
	}, function (n, o) {
		setPageName(n);
	});

	function setPageName(state) {
		if (state == "app") { $scope.pageName = pageNames[0]; }
		if (state == "app.nav.webservices") { $scope.pageName = pageNames[1]; }
		if (state == "app.nav.datafeeds") { $scope.pageName = pageNames[2]; }
		if (state == "app.nav.widgets") { $scope.pageName = pageNames[3]; }
	}

	$scope.getBackground = function () {
		if ($scope.pageName === pageNames[0]) { return "bg-content"; }
		if ($scope.pageName === pageNames[1]) { return "bg-ws"; }
		if ($scope.pageName === pageNames[2]) { return "bg-df"; }
		if ($scope.pageName === pageNames[3]) { return "bg-wdgt"; }
	};

	navData.getCurrentCollection().then(function (d) {
		$scope.col = d;
	})

});