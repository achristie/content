app.controller('HeaderCtrl', function ($scope, $state, navData) {
	pageNames = ['Content', 'Web Services', 'Data Feeds', 'Widgets'];

	$scope.$watch(function () {
		return $state.current.name;
	}, function (n, o) {
		setPageName(n);
	});

	$scope.$watch(function () {
		return navData.getCurrentActives();
	}, function (n, o) {
		$scope.webServices = n['webservices'];
		$scope.dataFeeds = n['datafeeds'];
		$scope.widgets = n['widgets'];
	}, true);

	$scope.getClass = function () {
		if ($scope.pageName === pageNames[0]) { return "text-content"; }
		if ($scope.pageName === pageNames[1]) { return "text-ws"; }
		if ($scope.pageName === pageNames[2]) { return "text-df"; }
		if ($scope.pageName === pageNames[3]) { return "text-wdgt"; }
	};

	$scope.getGradient = function () {
		if ($scope.pageName === pageNames[0]) { return "bg-content-grdt"; }
		if ($scope.pageName === pageNames[1]) { return "bg-ws-grdt"; }
		if ($scope.pageName === pageNames[2]) { return "bg-df-grdt"; }
		if ($scope.pageName === pageNames[3]) { return "bg-wdgt-grdt"; }
	};

	function setPageName(state) {
		if (state == "app") { $scope.pageName = pageNames[0]; }
		if (state == "app.nav.webservices") { $scope.pageName = pageNames[1]; }
		if (state == "app.nav.datafeeds") { $scope.pageName = pageNames[2]; }
		if (state == "app.nav.widgets") { $scope.pageName = pageNames[3]; }
	}


});