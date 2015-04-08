app.controller('NavCtrl', function ($scope, navData, $state, $timeout) {
	$scope.col = [];
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

			//for the animation, make inactive, and then reactivate in nested timeout
			d[idx].isActive = false;
			d[idx].isOpen = false;

			$timeout(function() { 
				$scope.col = d;
			}, 10).then(function () {
				$timeout(function () {
					d[idx].isActive = true;
					d[idx].isOpen = true;
				}, 400 * d.length - 210)
			});
			
		});
	});

	function setPageName(state) {
		if (state == "app.index") { $scope.pageName = pageNames[0]; }
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