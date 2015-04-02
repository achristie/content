app.controller('NavCtrl', function ($scope, navData, $state) {
	$scope.col;
	var pageNames = ['Content', 'Web Services', 'Data Feeds', 'Widgets'];

	$scope.setState = function (g, sg) {
		$state.go($state.current.name, {group: g.name, subGroup: sg.name});
	};

	$scope.$watch(function () {
		return $state.current.name;
	}, function (n, o) {
		setPageName(n);
		navData.getCurrentCollection().then(function (d) {
			var idx = d.map(function (d) { return d.isActive; }).indexOf(true);
			d[idx].isOpen = true;

			$scope.col = d;	
		});
	});

	function setPageName(state) {
		if (state == "app") { $scope.pageName = pageNames[0]; }
		if (state == "app.nav.webservices") { $scope.pageName = pageNames[1]; }
		if (state == "app.nav.datafeeds") { $scope.pageName = pageNames[2]; }
		if (state == "app.nav.widgets") { $scope.pageName = pageNames[3]; }
	}

	$scope.getColor = function () {
		if ($scope.pageName === pageNames[0]) { return "text-content"; }
		if ($scope.pageName === pageNames[1]) { return "text-ws"; }
		if ($scope.pageName === pageNames[2]) { return "text-df"; }
		if ($scope.pageName === pageNames[3]) { return "text-wdgt"; }
	};

	$scope.getBackground = function () {
		if ($scope.pageName === pageNames[0]) { return "bg-content-hvr"; }
		if ($scope.pageName === pageNames[1]) { return "bg-ws-hvr"; }
		if ($scope.pageName === pageNames[2]) { return "bg-df-hvr"; }
		if ($scope.pageName === pageNames[3]) { return "bg-wdgt-hvr"; }
	};

});